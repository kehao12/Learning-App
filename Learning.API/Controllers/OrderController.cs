using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Learning.API.Data;
using Learning.API.DTOs;
using Learning.API.Helper;
using Learning.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;



namespace Learning.API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _repo;
        private readonly ICodeRepository _code;
        private readonly IMapper _mapper;
        private readonly ICourseRepository _course;
        public OrderController(IOrderRepository repo, ICodeRepository code, IMapper mapper, ICourseRepository course)
        {
            _mapper = mapper;
            _repo = repo;
            _code = code;
            _course = course;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetOrder()
        {
            var order = await _repo.GetOrders();

            var orderToReturn = _mapper.Map<IEnumerable<OrderForListDto>>(order);

            return Ok(orderToReturn);
        }

        [AllowAnonymous]
        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<IActionResult> GetOrder(int id)
        {
            var order = await _repo.GetOrder(id);


            var orderToReturn = _mapper.Map<OrderForDetailedDto>(order);


            return Ok(orderToReturn);
        }

        [HttpPost]
        public async Task<IActionResult> AddOrder(OrderForAddDto orderForAddDto)
        {
            orderForAddDto.CreatedAt = DateTime.Now;
            var OrderToCreate = _mapper.Map<Order>(orderForAddDto);
            _repo.Add(OrderToCreate);
            await _repo.SaveAll();

            return Ok();
        }

        [HttpPost("OrderDetail")]
        public async Task<IActionResult> OrderDetail(TestDto testDto)
        {
            int idOrderNew = _repo.GetOrderNew();
            foreach (var item in testDto.courseId)
            {
                OrderDetail orderDetail = new OrderDetail
                {
                    CourseId = item,
                    OrderId = idOrderNew,
                    Price = _course.PriceCourse(item),
                };
                _repo.Add(orderDetail);
                await _repo.SaveAll();
            }

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, OrderForUpdatedDto orderForUpdatedDto)
        {

            var OrderFromRepo = await _repo.GetOrder(id);

            _mapper.Map(orderForUpdatedDto, OrderFromRepo);
          

            if (await _repo.SaveAll())
                return NoContent();
            return Ok();

        }

        [HttpPost("SendMail")]
        public async Task<IActionResult> SendMail(EmailForSendDto emailForSendDto)
        {
            var order = await _repo.GetOrder(emailForSendDto.IdOrder);
            var orderForUpdatedDto = new OrderForUpdatedDto
            {   
                CodeId = order.CodeId,
                Status = 3,
            };
            var order1 = _mapper.Map(orderForUpdatedDto, order);
            if (await _repo.SaveAll()) {
            var client = new System.Net.Mail.SmtpClient("smtp.gmail.com", 587);
            client.UseDefaultCredentials = false;
            client.EnableSsl = true;

            client.Credentials = new System.Net.NetworkCredential("kuokuo0287@gmail.com", "dalat123");

            var mailMessage = new System.Net.Mail.MailMessage();
            mailMessage.From = new System.Net.Mail.MailAddress("kuokuo0287@gmail.com");

            mailMessage.To.Add(emailForSendDto.To);

            // if (!string.IsNullOrEmpty(email.Cc))
            // {
            //     mailMessage.CC.Add(email.Cc);
            // }

            mailMessage.Body = emailForSendDto.Text;

            mailMessage.Subject = "Mã kích hoạt cho khóa học";

            mailMessage.IsBodyHtml = true;
            mailMessage.BodyEncoding = System.Text.Encoding.UTF8;
            mailMessage.SubjectEncoding = System.Text.Encoding.UTF8;


            await client.SendMailAsync(mailMessage);
            return Ok();
            }
            return BadRequest();

        }


    }
}

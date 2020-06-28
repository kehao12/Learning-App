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
        public OrderController(IOrderRepository repo, ICodeRepository code, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
            _code = code;
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
            orderForAddDto.CreatedAt= DateTime.Now;
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
                OrderDetail orderDetail = new OrderDetail {
                    CourseId = item,
                    OrderId = idOrderNew
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

    }
}

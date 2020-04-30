using System;
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
    public class CodeController : ControllerBase
    {
        private readonly ICodeRepository _repo;
        private readonly IMapper _mapper;
        public CodeController(ICodeRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpPost]
        public async Task<IActionResult> AddCode(CodeForAddDto CodeForAddDto)
        {
            // ItemForAddDto.Name = ItemForAddDto.Name.ToLower();
           
            // if (await _repo.UserExists(ItemForAddDto.Name))
            //     return BadRequest("Tài khoản đã tồn tại");
            CodeForAddDto.CourseId= 3;
            CodeForAddDto.CodeID = GenerateCodes();
            CodeForAddDto.Status = true;
            
            var CodeToCreate = _mapper.Map<Code>(CodeForAddDto);
            _repo.Add(CodeToCreate);
            await _repo.SaveAll();

            return Ok(CodeToCreate);
        }



        public string GenerateCodes()
        {
            Random random = new Random();
            DateTime timeValue = DateTime.MinValue;
            // Create 10 codes just to see the random generation.
           
                int rand = random.Next(3600)+1; // add one to avoid 0 result.
                timeValue = timeValue.AddMinutes(rand);
                byte[] b = System.BitConverter.GetBytes(timeValue.Ticks);
                string voucherCode = Transcoder.Base32Encode(b);
                string code = string.Format("{0}-{1}-{2}", 
                              voucherCode.Substring(0,4),
                              voucherCode.Substring(4,4),
                              voucherCode.Substring(8,5));
                return code;
            
        }
    }
}

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
    public class CodeController : ControllerBase
    {
        private readonly ICodeRepository _repo;
        private readonly IMapper _mapper;
        public CodeController(ICodeRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetCode()
        {
             var Items = await _repo.GetCodes();

            var ItemsToReturn = _mapper.Map<IEnumerable<CodeForAddDto>>(Items);

            return Ok(ItemsToReturn);
        }

        [AllowAnonymous]
        [HttpGet("{id}", Name = "GetCode")]
        public async Task<IActionResult> GetCode(int id)
        {
            var Items = await _repo.GetCodeInt(id);

            var ItemsToReturn = _mapper.Map<CodeForDetailedDto>(Items);

            return Ok(ItemsToReturn);
        }

             [AllowAnonymous]
        [HttpGet("GetCourseByCode/{id}")]
        public async Task<IActionResult> GetCourseByCode(string id)
        {
            var Items = await _repo.GetCodesCourse(id);


            return Ok(Items);
        }

        [HttpPost]
        public async Task<IActionResult> AddCode(CodeForAddDto CodeForAddDto)
        {
            // ItemForAddDto.Name = ItemForAddDto.Name.ToLower();
           
            // if (await _repo.UserExists(ItemForAddDto.Name))
            //     return BadRequest("Tài khoản đã tồn tại");
            CodeForAddDto.CodeID = GenerateCodes();
            CodeForAddDto.Status = true;
            var CodeToCreate = _mapper.Map<Code>(CodeForAddDto);
            _repo.Add(CodeToCreate);
            await _repo.SaveAll();
             var CodeNew = await _repo.GetCode(CodeToCreate.CodeID);
            foreach (var item in CodeForAddDto.CourseId)
            {
                CodeCourse codeCourse = new CodeCourse {
                    CourseId = item,
                    CodeID = CodeNew.Id
                };
                _repo.Add(codeCourse);
                await _repo.SaveAll();
            }

            return Ok(CodeToCreate);
        }

        [AllowAnonymous]
        [HttpPost("ActiveCode")]
        public async Task<ActionResult> ActiveCode(CodeForActiveDto codeForActiveDto) {
            
            var code = await _repo.GetCode(codeForActiveDto.CodeID);
            if(code != null) {
                if(code.Status == true) {
                    
                    var codeCourse = await _repo.GetCodesCourse(code.CodeID);
                    foreach (var item in codeCourse)
                    {
                        UserCourse userCourse = new UserCourse {
                            CourseId = item.CourseId,
                            UserId = codeForActiveDto.UserId,
                            CreatedAt = DateTime.Now
                            };
                        _repo.Add(userCourse);
                        await _repo.SaveAll();
                    }
                    var code1 = code;
                    code1.Status = false;

                    _mapper.Map(code1, code);
                     if (await _repo.SaveAll())
                        return Ok();

                }
            }
            return BadRequest("fail");
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

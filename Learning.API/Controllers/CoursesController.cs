using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Learning.API.Data;
using Learning.API.DTOs;
using Learning.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Learning.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class CoursesController : ControllerBase
    {
        private readonly ICourseRepository _repo;
        private readonly IMapper _mapper;
        public CoursesController(ICourseRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetCourse()
        {
             var courses = await _repo.GetCourses();

            var coursesToReturn = _mapper.Map<IEnumerable<CourseForListDto>>(courses);

            return Ok(coursesToReturn);
        }

        [HttpGet("{id}", Name = "GetCourse")]
        public async Task<IActionResult> GetCourse(int id)
        {
            var courses = await _repo.GetCourse(id);

            var courseToReturn = _mapper.Map<CourseForDetailedDto>(courses);

            return Ok(courseToReturn);
        }

        [HttpPost]
        public async Task<IActionResult> AddCourse(CourseForAddDto courseForAddDto)
        {
            // courseCategoryForAddDto.Name = courseCategoryForAddDto.Name.ToLower();
            courseForAddDto.CreatedDate = DateTime.Now;
            courseForAddDto.CreatedBy = User.Identity.Name.ToString();

            courseForAddDto.UpdatedDate = DateTime.Now;
            courseForAddDto.UpdatedBy = User.Identity.Name.ToString();

            // if (await _repo.UserExists(courseCategoryForAddDto.Name))
            //     return BadRequest("Tài khoản đã tồn tại");
            
            var courseToCreate = _mapper.Map<Course>(courseForAddDto);
            _repo.Add(courseToCreate);
            await _repo.SaveAll();

            return StatusCode(201);
        }


    }
}
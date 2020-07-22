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
    [Route("api/[controller]")]
    [ApiController]
    public class LessonsController : ControllerBase
    {
        private readonly ILessonRepository _repo;
        private readonly IMapper _mapper;
        public LessonsController(ILessonRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }




        [HttpGet]
        public async Task<IActionResult> GetLesson()
        {
            var Lessons = await _repo.GetLessons();

            var LessonsToReturn = _mapper.Map<IEnumerable<LessonForListDto>>(Lessons);

            return Ok(LessonsToReturn);
        }

        [AllowAnonymous]
        [HttpGet("{id}", Name = "GetLesson")]
        public async Task<IActionResult> GetLesson(int id)
        {
            var Lessons = await _repo.GetLesson(id);

            var LessonsToReturn = _mapper.Map<LessonForDetailDto>(Lessons);

            return Ok(LessonsToReturn);
        }
        [AllowAnonymous]
        [HttpGet("getLessonByCourse/{id}")]
        public async Task<IActionResult> GetLessonByCourse(int id)
        {
            var Lessons = await _repo.GetLessonByIdCourse(id);

            foreach (var lesson in Lessons)
            {
                foreach (var item in lesson.Items)
                {
                    if (item.Files.TypeId == 1)
                    {
                        item.Files.Url = BaseURL.GetBaseUrl(Request) + "/Upload/Video/" + item.Files.Url;
                    }
                    if (item.Files.TypeId == 2)
                    {
                        item.Files.Url = BaseURL.GetBaseUrl(Request) + "/Upload/File/" + item.Files.Url;
                    }
                }
            }

            var LessonsToReturn = _mapper.Map<IEnumerable<LessonForListDto>>(Lessons);

            return Ok(LessonsToReturn);
        }


        [HttpPost]
        public async Task<IActionResult> AddLesson(LessonForAddDto LessonForAddDto)
        {
            // LessonForAddDto.Name = LessonForAddDto.Name.ToLower();

            // if (await _repo.UserExists(LessonForAddDto.Name))
            //     return BadRequest("Tài khoản đã tồn tại");

            var LessonToCreate = _mapper.Map<Lesson>(LessonForAddDto);
            _repo.Add(LessonToCreate);
            await _repo.SaveAll();

            return Ok(LessonToCreate);
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> Updatelesson(int id, LessonForUpdateDto LessonForUpdateDto)
        {

            var lessonFromRepo = await _repo.GetLesson(id);

            _mapper.Map(LessonForUpdateDto, lessonFromRepo);

            if (await _repo.SaveAll())
                return NoContent();
            return Ok();

        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteLesson(int id)
        {
            var Lesson = await _repo.GetLesson(id);
            if (Lesson == null)
            {
                return NotFound();
            }

            _repo.Delete(Lesson);
            await _repo.SaveAll();

            return Ok();
        }


    }

}
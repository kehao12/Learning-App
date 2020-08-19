using System.Threading.Tasks;
using Learning.API.Data;
using Learning.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Learning.API.DTOs;
using System.Collections.Generic;
using AutoMapper;
using System;

namespace Learning.API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]

    public class ExamController : ControllerBase
    {
        private readonly IExamRepository _repo;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public ExamController(IExamRepository repo, IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _repo = repo;
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetQuestion()
        {
            var Items = await _repo.GetQuestions();

            var ItemsToReturn = _mapper.Map<IEnumerable<QuestionForListDto>>(Items);

            return Ok(ItemsToReturn);
        }

        [AllowAnonymous]
        [HttpGet("GetExam/{id}")]
        public async Task<IActionResult> GetExam(int id)
        {
            var values = await (from t in _context.Tests
                                where t.Id == id
                                select new
                                {
                                    Id = t.Id,
                                    Name = t.Name,
                                    Time = t.Time,
                                    Point = t.Point,
                                    Description = t.Description,
                                    CreatedAt = t.CreatedAt,
                                    Questions = (from tq in _context.TestQuestions
                                                 join q in _context.Questions on tq.QuestionId equals q.Id
                                                 where tq.TestId == t.Id
                                                 select new
                                                 {
                                                     Id = q.Id,
                                                     Content = q.Content,
                                                     Url = q.Url,
                                                     TypeId = q.TypeId,
                                                     Answer = (from a in _context.Answers
                                                               where a.QuestionId == q.Id
                                                               select a)
                                                 }).ToList()
                                }).FirstOrDefaultAsync();

            return Ok(values);
        }


        [AllowAnonymous]
        [HttpGet("GetExams")]
        public async Task<IActionResult> GetExams()
        {
            var values = await (from t in _context.Tests
                                select new
                                {
                                    Id = t.Id,
                                    Name = t.Name,
                                    Time = t.Time,
                                    Point = t.Point,
                                    Description = t.Description,
                                    CreatedAt = t.CreatedAt,
                                    Questions = (from tq in _context.TestQuestions
                                                 join q in _context.Questions on tq.QuestionId equals q.Id
                                                 where tq.TestId == t.Id
                                                 select new
                                                 {
                                                     Id = q.Id,
                                                     Content = q.Content,
                                                     Url = q.Url,
                                                     TypeId = q.TypeId,
                                                     Answer = (from a in _context.Answers
                                                               where a.QuestionId == q.Id
                                                               select a)
                                                 }).ToList()
                                }).ToListAsync();

            return Ok(values);
        }

        [AllowAnonymous]
        [HttpGet("{id}", Name = "GetQuestion")]
        public async Task<IActionResult> GetQuestion(int id)
        {
            var Items = await _repo.GetQuestion(id);

            var ItemsToReturn = _mapper.Map<QuestionForListDto>(Items);

            return Ok(ItemsToReturn);
        }

        [HttpPost]
        public async Task<IActionResult> AddItem(QuestionForAddDto QuestionForAddDto)
        {
            var question = new Question
            {
                Content = QuestionForAddDto.Content,
                Url = QuestionForAddDto.Url,
                TypeId = QuestionForAddDto.TypeId
            };



            _repo.Add(question);
            if (await _repo.SaveAll())
            {
                var questionToReturn = _mapper.Map<Question>(question);
                foreach (var answer in QuestionForAddDto.Answer)
                {
                    var ans = new Answer
                    {
                        Content = answer.Content,
                        QuestionId = question.Id,
                        AnswerTrue = answer.AnswerTrue
                    };
                    _repo.Add(ans);
                    await _repo.SaveAll();
                }
                return CreatedAtRoute("GetQuestion", new { id = question.Id }, questionToReturn);
            }

            return BadRequest("Could not add the photo");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditQuestion(int id, QuestionForAddDto QuestionForAddDto)
        {
            var questionFromRepo = await _repo.GetQuestion(id);
            var question = new QuestionForUpdateDto
            {

                Content = QuestionForAddDto.Content,

            };
            var q = _mapper.Map(question, questionFromRepo);
            await _repo.SaveAll();
            foreach (var answer in QuestionForAddDto.Answer)
            {
                var ans = new AnswerForUpdateDto
                {

                    Content = answer.Content,

                    AnswerTrue = answer.AnswerTrue
                };
                var answerFromRepo = await _repo.GetAnswer(answer.Id);
                var a = _mapper.Map(ans, answerFromRepo);
                await _repo.SaveAll();

            }

            return CreatedAtRoute("GetQuestion", new { id = questionFromRepo.Id }, questionFromRepo);
        }

        [HttpPost("CreateExam")]
        public async Task<IActionResult> CreateExam(ExamForAddDto examForAddDto)
        {
            var exam = new Test
            {
                Name = examForAddDto.Name,
                Description = examForAddDto.Description,
                Time = examForAddDto.Time,
                Point = examForAddDto.Point,
                CreatedAt = DateTime.Now
            };
            _repo.Add(exam);
            if (await _repo.SaveAll())
            {
                var examToReturn = _mapper.Map<Test>(exam);

                foreach (var question in examForAddDto.Questions)
                {
                    var examQuestion = new TestQuestion
                    {
                        QuestionId = question.Id,
                        TestId = examToReturn.Id
                    };
                    _repo.Add(examQuestion);
                    await _repo.SaveAll();
                }
                return Ok();
                // return CreatedAtRoute("GetQuestion", new { id = question.Id }, questionToReturn);
            }

            return BadRequest("Could not add the photo");
        }

        [HttpPut("UpdateExam/{id}")]
        public async Task<IActionResult> UpdateExam(int id, ExamForUpdatedDto examForUpdatedDto)
        {

            var examFormRepo = await _repo.GetExam(id);
            var qOlds = await _repo.GetQuestionsByTest(id);
            var test = await _repo.GetTestQuestion(id);
            _mapper.Map(examForUpdatedDto, examFormRepo);
            await _repo.SaveAll();

            foreach (var t in test)
            {
                _repo.Delete(t);
            }

            foreach (var qNew in examForUpdatedDto.Questions)
            {
                var testQuestion = new TestQuestion
                {
                    TestId = examFormRepo.Id,
                    QuestionId = qNew.Id
                };
                _repo.Add(testQuestion);
                await _repo.SaveAll();
            }

            return Ok();

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var data = await _repo.GetExam(id);
            if (data == null)
            {
                return NotFound();
            }

            var test = await _repo.GetTestQuestion(id);
            foreach (var t in test)
            {
                _repo.Delete(t);
            }
            _repo.Delete(data);
            await _repo.SaveAll();
            return Ok(data);
        }


    }
}
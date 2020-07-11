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
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]

    public class ExamController : ControllerBase
    {
        private readonly IExamRepository _repo;
        private readonly IMapper _mapper;
        public ExamController(IExamRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
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
                Content = QuestionForAddDto.Content
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



    }
}
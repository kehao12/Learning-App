using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Learning.API.Data;
using Learning.API.Dtos;
using Learning.API.DTOs;
using Learning.API.Helper;
using Learning.API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Learning.API.Controllers
{
    //[ServiceFilter(typeof(LogUserActivity))]
  
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ILearningRepository _repo;
        private readonly IMapper _mapper;
        public UsersController(ILearningRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
        
     
        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery]UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId);

            userParams.UserId = currentUserId;

            if (string.IsNullOrEmpty(userParams.Gender))
            {
                userParams.Gender = userFromRepo.Gender == "male" ? "female" : "male";
            }

            var users = await _repo.GetUsers(userParams);

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            Response.AddPagination(users.CurrentPage, users.PageSize,
            users.TotalCount, users.TotalPages);

            return Ok(usersToReturn);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);

            var userToReturn = _mapper.Map<UserForDetailedDto>(user);

            return Ok(userToReturn);
        }

        [AllowAnonymous]
        [HttpGet("GetUserAll")]
        public async Task<IActionResult> GetUserAll(int id)
        {
            var user = await _repo.GetAllUser();

            var userToReturn = _mapper.Map<IEnumerable<UserForListDto>>(user);

            return Ok(userToReturn);
        }

        [AllowAnonymous]
        [HttpGet("GetStudent")]
        public async Task<IActionResult> GetStudent()
        {
            var user = await _repo.GetStudent();

            var userToReturn = _mapper.Map<IEnumerable<UserForDetailedDto>>(user);

            return Ok(userToReturn);
        }

        [AllowAnonymous]
        [HttpGet("GetTeacher")]
        public async Task<IActionResult> GetTeacher()
        {
            var user = await _repo.GetTeacher();


            return Ok(user);
        }

        [AllowAnonymous]
        [HttpGet("GetAdmin")]
        public async Task<IActionResult> GetAdmin()
        {
            var user = await _repo.GetAdmin();

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpGet("GetStudentNotRegister/{courseId}")]
        public async Task<IActionResult> GetStudentNotRegister(int courseId)
        {
            var user = await _repo.GetStudentNotRegister(courseId);

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpGet("GetUserByName/{name}")]
        public async Task<IActionResult> GetUserByName(string name)
        {
            var user = await _repo.GetUserByName(name);
            var userToReturn = _mapper.Map<UserForDetailedDto>(user);

            return Ok(userToReturn);
        }
        
   


      [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            // if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            var userFromRepo = await _repo.GetUser(id);

            _mapper.Map(userForUpdateDto, userFromRepo);

            if (await _repo.SaveAll())
                return NoContent();
            
            throw new Exception($"Updating user {id} failed on save");
        }

    }
}
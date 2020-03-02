using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Learning.API.Data;
using Learning.API.DTOs;
using Learning.API.Helper;
using Learning.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic.CompilerServices;

namespace Learning.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class CoursesController : ControllerBase
    {
        private readonly ICourseRepository _repo;
        private readonly IMapper _mapper;
        private IHostingEnvironment _hostingEnv;
        private DataContext _data;
        public CoursesController(ICourseRepository repo, IMapper mapper, IHostingEnvironment hostingEn, DataContext data)
        {
            _mapper = mapper;
            _repo = repo;
            _hostingEnv = hostingEn;
            _data = data;
    
        }

        [HttpGet]
        public async Task<IActionResult> GetCourse()
        {
             var courses = await _repo.GetCourses();

             foreach (var course in courses)
             {
                if  (course.Image!=null)
                {
                    course.Image = BaseURL.GetBaseUrl(Request) + "/Upload/" + course.Image;
                }
             }

            var coursesToReturn = _mapper.Map<IEnumerable<CourseForListDto>>(courses);

            return Ok(coursesToReturn);
        }

        [HttpGet("{id}", Name = "GetCourse")]
        public async Task<IActionResult> GetCourse(int id)
        {
            var courses = await _repo.GetCourse(id);

             if  (courses.Image!=null)
                {
                    courses.Image = BaseURL.GetBaseUrl(Request) + "/Upload/" + courses.Image;
                }
            var courseToReturn = _mapper.Map<CourseForDetailedDto>(courses);


            return Ok(courseToReturn);
        }

        [HttpPost]
        public async Task<IActionResult> AddCourse([FromForm]CourseForAddDto courseForAddDto)
        {
         
            // courseCategoryForAddDto.Name = courseCategoryForAddDto.Name.ToLower();
            courseForAddDto.CreatedDate = DateTime.Now;
            courseForAddDto.CreatedBy = User.Identity.Name.ToString();

            courseForAddDto.UpdatedDate = DateTime.Now;
            courseForAddDto.UpdatedBy = User.Identity.Name.ToString();
            courseForAddDto.UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            // if (await _repo.UserExists(courseCategoryForAddDto.Name))
            //     return BadRequest("Tài khoản đã tồn tại");
            
            var file = courseForAddDto.File;
             
                // _repo.Add(courseToCreate);
                // await _repo.SaveAll();
           
              var courseToCreate = _mapper.Map<Course>(courseForAddDto);
                _repo.Add(courseToCreate);
                await _repo.SaveAll();
                int idOfCoursAdded = _repo.GetCourseMaxID();
                
             if (file != null)
            {
                string newFileName = idOfCoursAdded + "_" + file.FileName;
                string path = Path.Combine(_hostingEnv.ContentRootPath, "Upload", newFileName);
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    file.CopyTo(stream);
                    courseForAddDto.Image = newFileName;
                    courseToCreate.Image = courseForAddDto.Image;
                    //_data.Entry(courseForAddDto).Property(x => x.Image).IsModified = true;
                    var courseFromRepo1 = await _repo.GetCourse(idOfCoursAdded);
                    _mapper.Map(courseToCreate, courseFromRepo1);
                    await _repo.SaveAll();
                }
            }
     
               
                
                    
            return StatusCode(201);
        }


        [HttpGet("getImageData/{id}")]
        public async Task<IActionResult> GetImageData(int id)
        {
             var aUser = await _repo.GetCourse(id);
            if (aUser != null)
            {
                if (!String.IsNullOrEmpty(aUser.Image))
                {
                    string path = Path.Combine(_hostingEnv.ContentRootPath, "Upload", aUser.Image);
                    try
                    {
                        byte[] bytes = System.IO.File.ReadAllBytes(path);
                        string base64Str = Convert.ToBase64String(bytes);
                        return Ok(new FileDataInfo
                        {
                            FileName = aUser.Image,
                            Extension = Path.GetExtension(aUser.Image),
                            Data = "data:image/*;base64;" + base64Str

                        });

                    }
                    catch
                    {

                    }
                }
                return NoContent();
            }
            return NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCourse(int id)
        {
            var data = await _repo.GetCourse(id);

            if (data == null)
            {
                return NotFound();
            }

            _repo.Delete(data);
            await _repo.SaveAll();
            return Ok();
        }
   
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCourse(int id, [FromForm] CourseForUpdateDto courseForUpdateDto)
        {
             courseForUpdateDto.CreatedDate = DateTime.Now;
            courseForUpdateDto.CreatedBy = User.Identity.Name.ToString();

            courseForUpdateDto.UpdatedDate = DateTime.Now;
            courseForUpdateDto.UpdatedBy = User.Identity.Name.ToString();
            courseForUpdateDto.UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var courseFormRepo = await _repo.GetCourse(id);
            if (courseFormRepo == null)
            {
                return NotFound();
            }

            var file2 = courseFormRepo.Image;
            

            string path = "";
            if (!String.IsNullOrEmpty(file2))
            path=Path.Combine(_hostingEnv.ContentRootPath, "Upload", file2);
            var file = courseForUpdateDto.File;


            if (!System.IO.File.Exists(path))
            {

                if (file != null)
                {
                    string newFileName = id + "_" + file.FileName;
                    string path2 = Path.Combine(_hostingEnv.ContentRootPath, "Upload", newFileName);
                    using (var stream = new FileStream(path2, FileMode.Create))
                    {
                        file.CopyTo(stream);
                        courseForUpdateDto.Image = newFileName;
                        _mapper.Map(courseForUpdateDto, courseFormRepo);
                        await _repo.SaveAll();
                    }
                }
                return Ok();
            }
            else if (System.IO.File.Exists(path))
            {


                if (file != null)
                {
                    string newFileName = id + "_" + file.FileName;
                    string path2 = Path.Combine(_hostingEnv.ContentRootPath, "Upload", newFileName);
                    using (var stream = new FileStream(path2, FileMode.Create))
                    {
                        file.CopyTo(stream);
                        
                        courseForUpdateDto.Image = newFileName;
                        _mapper.Map(courseForUpdateDto, courseFormRepo);
                        await _repo.SaveAll();
                        if (System.IO.File.Exists(path))
                            try { System.IO.File.Delete(path); } catch { }
                    }
                }
                else
                {
                    courseForUpdateDto.Image = null;
                    _mapper.Map(courseForUpdateDto, courseFormRepo);
                    await _repo.SaveAll();

                }
                return Ok(courseForUpdateDto);
            }

            return Ok(courseForUpdateDto);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var data = await _repo.GetCourse(id);
            if (data == null)
            {
                return NotFound();
            }

            _repo.Delete(data);
            await _repo.SaveAll();
            return Ok(data);
        }
    }
}
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

    [Route("api/[controller]")]
    [ApiController]

    public class CoursesController : ControllerBase
    {
        private readonly ICourseRepository _repo;
         private readonly ILessonRepository _lesson;
        private readonly IMapper _mapper;
        private IHostingEnvironment _hostingEnv;
        private DataContext _data;
        private ILearningRepository _user;
        public CoursesController(ICourseRepository repo, IMapper mapper,
        ILessonRepository lesson,
        ILearningRepository user,
        IHostingEnvironment hostingEn,
        DataContext data)
        {
            _mapper = mapper;
            _repo = repo;
            _hostingEnv = hostingEn;
            _data = data;
            _lesson = lesson;
            _user = user;
        }

        [AllowAnonymous]
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

        // [AllowAnonymous]
        // [HttpGet("{id}",Name="GetCoursesByCate")]
        // public async Task<IActionResult> GetCoursesByCate(int id) {
        //     var courses = await _repo.GetCoursesByCate(id);

        //      foreach (var course in courses)
        //      {
        //         if  (course.Image!=null)
        //         {
        //             course.Image = BaseURL.GetBaseUrl(Request) + "/Upload/" + course.Image;
        //         }
        //      }

        //     var coursesToReturn = _mapper.Map<IEnumerable<CourseForListDto>>(courses);

        //     return Ok(coursesToReturn);
        // }

        [AllowAnonymous]
        [HttpGet("getCourseNew")]
        public async Task<IActionResult> GetCourseNew() {
            var courses = await _repo.GetCoursesNew();

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

        [AllowAnonymous]
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
            courseForAddDto.IdCreatedBy = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            courseForAddDto.UpdatedDate = DateTime.Now;
            courseForAddDto.UpdatedBy = User.Identity.Name.ToString();
            

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

   
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCourse(int id, [FromForm] CourseForUpdateDto courseForUpdateDto)
        {
            // Set dữ liệu mặc định
            courseForUpdateDto.CreatedDate = DateTime.Now;
            courseForUpdateDto.CreatedBy = User.Identity.Name.ToString();

            courseForUpdateDto.UpdatedDate = DateTime.Now;
            courseForUpdateDto.UpdatedBy = User.Identity.Name.ToString();
            
            // Lấy đối tượng trước khi được cập nhật
            var courseFormRepo = await _repo.GetCourse(id);
         
            // Kiểm tra đối tượng có tồn tại hay không
            if (courseFormRepo == null)
            {
                return NotFound();
            }

            // Gán tên thuộc tính hình của đối tượng trước khi cập nhật
            var file2 = courseFormRepo.Image;
            
            string path = "";

            // Nếu thuộc tính hình có tồn tại thì set một đường link theo vị trí lưu hình 
            if (!String.IsNullOrEmpty(file2))
            path=Path.Combine(_hostingEnv.ContentRootPath, "Upload", file2);

            // Lấy tập tin mới được thêm vào
            var file = courseForUpdateDto.File;

            // Kiểm tra tập tin đã tồn tại hay không
            if (!System.IO.File.Exists(path))
            {
                // Nếu chưa tồn tại, kiểm tra tập tin có rỗng không
                if (file != null)
                {
                    // Gán tên mới để lưu theo cú pháp mã khoá học + tên file
                    string newFileName = id + "_" + file.FileName;
                    // Tạo đường dẫn lưu file
                    string path2 = Path.Combine(_hostingEnv.ContentRootPath, "Upload", newFileName);

                    // Tiến hành lưu file
                    using (var stream = new FileStream(path2, FileMode.Create))
                    {
                        file.CopyTo(stream);
                        // Cập nhật tên hình
                        courseForUpdateDto.Image = newFileName;
                        // Map dữ liệu và lưu những thay đổi
                        _mapper.Map(courseForUpdateDto, courseFormRepo);
                        await _repo.SaveAll();
                    }
                }
                // Nếu file null
                else {
                // Map dữ liệu và lưu những thay đổi
                _mapper.Map(courseForUpdateDto, courseFormRepo);
                  await _repo.SaveAll();
                }
                
                return Ok(courseForUpdateDto);
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
                    // !courseForUpdateDto.Image = null;
                    courseForUpdateDto.Image = courseFormRepo.Image;
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
        
        [AllowAnonymous]
        [HttpPost("AddUserCourse")]
        public async Task<ActionResult> AddUserCourse(UserCourseForAddDto userCourseForAddDto) {
            var ItemToCreate = _mapper.Map<UserCourse>(userCourseForAddDto);
            _repo.Add(ItemToCreate);
            await _repo.SaveAll();

            return Ok(ItemToCreate);
        }

    }
}
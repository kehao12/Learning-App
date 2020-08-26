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
                if (course.Image != null)
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
        public async Task<IActionResult> GetCourseNew()
        {
            var courses = await _repo.GetCoursesNew();

            foreach (var course in courses)
            {
                if (course.Image != null)
                {
                    course.Image = BaseURL.GetBaseUrl(Request) + "/Upload/" + course.Image;
                }
            }

            var coursesToReturn = _mapper.Map<IEnumerable<CourseForListDto>>(courses);

            return Ok(coursesToReturn);
        }

        [AllowAnonymous]
        [HttpGet("getItemByUserCourse/{idCourse}/{idUser}")]
        public async Task<IActionResult> getItemByUserCourse(int idCourse, int idUser)
        {
            var courses = _repo.LessonByUserCourse(idCourse, idUser);

            return Ok(courses);
        }

        [AllowAnonymous]
        [HttpGet("{id}", Name = "GetCourse")]
        public async Task<IActionResult> GetCourse(int id)
        {
            var courses = await _repo.GetCourse(id);



            if (courses.Image != null)
            {
                courses.Image = BaseURL.GetBaseUrl(Request) + "/Upload/" + courses.Image;
            }
            var courseToReturn = _mapper.Map<CourseForDetailedDto>(courses);



            return Ok(courseToReturn);
        }


        [HttpPost]
        public async Task<IActionResult> AddCourse([FromForm] CourseForAddDto courseForAddDto)
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




            return Ok(courseToCreate);
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
            // courseForUpdateDto.CreatedDate = DateTime.Now;
            // courseForUpdateDto.CreatedBy = User.Identity.Name.ToString();

            courseForUpdateDto.UpdatedDate = DateTime.Now;
            courseForUpdateDto.UpdatedBy = User.Identity.Name.ToString();

            // Lấy đối tượng trước khi được cập nhật
            var courseFormRepo = await _repo.GetCourse(id);
            courseForUpdateDto.CreatedDate = courseFormRepo.CreatedDate;
            courseForUpdateDto.CreatedBy = courseFormRepo.CreatedBy;

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
                path = Path.Combine(_hostingEnv.ContentRootPath, "Upload", file2);

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
                else
                {
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

        [HttpPut("UpdateStatus/{id}")]
        public async Task<ActionResult> UpdateStatus(int id, ChangeStatusCourseForDto changeStatusCourse)
        {
            var courseFromRepo = await _repo.GetCourse(id);
            var course = _mapper.Map(changeStatusCourse, courseFromRepo);
            if (await _repo.SaveAll())
            {
                return Ok(course);

            }
            return BadRequest();
        }

        [HttpPut("UpdateUserCourse/{id}")]
        public async Task<ActionResult> UpdateUserCourse(int id, EmailForSendDto emailForSendDto)
        {
            var courseFromRepo = await _repo.GetUserCourseById(id);
            var changeStatusUserCourse = new ChangeStatusUserCourse
            {
                Finsish = 1
            };
            var course = _mapper.Map(changeStatusUserCourse, courseFromRepo);
            if (await _repo.SaveAll())
            {
                var client = new System.Net.Mail.SmtpClient("smtp.gmail.com", 587);
                client.UseDefaultCredentials = false;
                client.EnableSsl = true;

                client.Credentials = new System.Net.NetworkCredential("kuokuo0287@gmail.com", "dalat123");

                var mailMessage = new System.Net.Mail.MailMessage();
                mailMessage.From = new System.Net.Mail.MailAddress("kuokuo0287@gmail.com");

                mailMessage.To.Add(emailForSendDto.To);

                // if (!string.IsNullOrEmpty(email.Cc))
                // {
                //     mailMessage.CC.Add(email.Cc);
                // }

                mailMessage.Body = emailForSendDto.Text;

                mailMessage.Subject = "Chứng nhận hoàn thành khoá học";

                mailMessage.IsBodyHtml = true;
                mailMessage.BodyEncoding = System.Text.Encoding.UTF8;
                mailMessage.SubjectEncoding = System.Text.Encoding.UTF8;


                await client.SendMailAsync(mailMessage);
                return Ok();

            }
            return BadRequest();
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
        public async Task<ActionResult> AddUserCourse(UserCourseForAddDto userCourseForAddDto)
        {
            userCourseForAddDto.CreatedAt = DateTime.Now;
            var ItemToCreate = _mapper.Map<UserCourse>(userCourseForAddDto);
            _repo.Add(ItemToCreate);
            await _repo.SaveAll();

            return Ok(ItemToCreate);
        }

        [AllowAnonymous]
        [HttpPost("AddUserCourseMutiple")]
        public async Task<ActionResult> AddUserCourseMutiple(UserCourseMutiple userCourseMutiple)
        {
            foreach (var item in userCourseMutiple.UserId)
            {
                UserCourse userCourse = new UserCourse
                {
                    CourseId = userCourseMutiple.CourseId,
                    UserId = item,
                    CreatedAt = DateTime.Now
                };
                _repo.Add(userCourse);
                await _repo.SaveAll();
            }
            // userCourseMutiple.CreatedAt = DateTime.Now;
            // var ItemToCreate = _mapper.Map<UserCourse>(userCourseMutiple);
            // _repo.Add(ItemToCreate);
            // await _repo.SaveAll();

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("AddReview")]
        public async Task<ActionResult> AddReview(ReviewForAddDto reviewForAddDto)
        {
            int check = _repo.CheckReview(reviewForAddDto.UserId, reviewForAddDto.CourseId);
            if (check == 0)
            {
                reviewForAddDto.CreatedAt = DateTime.Now;
                var reviewToCreate = _mapper.Map<Review>(reviewForAddDto);
                _repo.Add(reviewToCreate);
                await _repo.SaveAll();
                return Ok(reviewToCreate);
            }
            else
            {
                var rvFormRepo = await _repo.GetReview(reviewForAddDto.UserId, reviewForAddDto.CourseId);
                var rvForUpdated = new ReviewForUpdatedDto
                {
                    Comment = reviewForAddDto.Comment,
                    Rating = reviewForAddDto.Rating,
                    CreatedAt = DateTime.Now,
                };
                var rv = _mapper.Map(rvForUpdated, rvFormRepo);
                await _repo.SaveAll();
                return Ok(rvFormRepo);
            }

            // userCourseMutiple.CreatedAt = DateTime.Now;
            // var ItemToCreate = _mapper.Map<UserCourse>(userCourseMutiple);
            // _repo.Add(ItemToCreate);
            // await _repo.SaveAll();


        }

        [AllowAnonymous]
        [HttpGet("GetReview/{courseId}")]
        public async Task<IActionResult> GetReview(int courseId)
        {
            var rv = await _repo.GetReviews(courseId);
            return Ok(rv);
        }

        [AllowAnonymous]
        [HttpGet("GetMyCourse/{courseId}/{userId}")]
        public async Task<IActionResult> GetMyCourse(int courseId, int userId)
        {
            var courses = await _repo.GetMyCourse(courseId, userId);



            if (courses.Image != null)
            {
                courses.Image = BaseURL.GetBaseUrl(Request) + "/Upload/" + courses.Image;
            }
            var courseToReturn = _mapper.Map<CourseForDetailedDto>(courses);



            return Ok(courseToReturn);
        }

        [AllowAnonymous]
        [HttpGet("GetStudentByCoures/{id}")]
        public async Task<IActionResult> GetStudentByCouresYear(int id)
        {
            var users = await _repo.GetStudentByCoures(id);



            //  if  (courses.Image!=null)
            //     {
            //         courses.Image = BaseURL.GetBaseUrl(Request) + "/Upload/" + courses.Image;
            //     }
            // var courseToReturn = _mapper.Map<UserForListDto>(users);



            return Ok(users);
        }

        [AllowAnonymous]
        [HttpGet("GetStudentByCouresYear/{id}/{year}")]
        public async Task<IActionResult> GetStudentByCouresYear(int id, int year)
        {
            var users = await _repo.GetStudentByCouresYear(id, year);



            //  if  (courses.Image!=null)
            //     {
            //         courses.Image = BaseURL.GetBaseUrl(Request) + "/Upload/" + courses.Image;
            //     }
            // var courseToReturn = _mapper.Map<UserForListDto>(users);



            return Ok(users);
        }
        [AllowAnonymous]
        [HttpGet("GetStudentByCouresMonth/{id}/{month}/{year}")]
        public async Task<IActionResult> GetStudentByCouresMonth(int id, int month, int year)
        {
            var users = await _repo.GetStudentByCouresMonth(id, month, year);



            //  if  (courses.Image!=null)
            //     {
            //         courses.Image = BaseURL.GetBaseUrl(Request) + "/Upload/" + courses.Image;
            //     }
            // var courseToReturn = _mapper.Map<UserForListDto>(users);



            return Ok(users);
        }
        [AllowAnonymous]
        [HttpGet("GetStudentByCouresDay/{id}/{day}/{month}/{year}")]
        public async Task<IActionResult> GetStudentByCouresDay(int id, int day, int month, int year)
        {
            var users = await _repo.GetStudentByCouresDay(id, day, month, year);



            //  if  (courses.Image!=null)
            //     {
            //         courses.Image = BaseURL.GetBaseUrl(Request) + "/Upload/" + courses.Image;
            //     }
            // var courseToReturn = _mapper.Map<UserForListDto>(users);



            return Ok(users);
        }

        [AllowAnonymous]
        [HttpGet("GetStudentByCouresAll")]
        public async Task<IActionResult> GetStudentByCouresAll()
        {
            var users = await _repo.GetStudentByCouresAll();
            // foreach (var user in users)
            // {
            //     user.Course = _repo.FindCourseByUserCourse(user.UserCourseId);
            //     user.Duration = _repo.FindDuration(user.Course.ID, user.Id)/360;
            //     user.Processing = ((double)(_repo.CountItemMyCourse(user.Course.ID, user.Id) / (double)_repo.CountItem(user.Course.ID)))*100;
            // }


            //  if  (courses.Image!=null)
            //     {
            //         courses.Image = BaseURL.GetBaseUrl(Request) + "/Upload/" + courses.Image;
            //     }
            // var courseToReturn = _mapper.Map<UserForListDto>(users);



            return Ok(users);
        }

        [AllowAnonymous]
        [HttpGet("GiveItemByUserCourse/{courseId}/{userId}")]
        public async Task<IActionResult> GiveItemByUserCourse(int courseId, int userId)
        {
            int users = _repo.GiveItemByUserCourse(courseId, userId);
            if (users == 0)
            {
                users = _repo.GiveItemDefault(courseId);
            }
            // foreach (var user in users)
            // {
            //     user.Course = _repo.FindCourseByUserCourse(user.UserCourseId);
            //     user.Duration = _repo.FindDuration(user.Course.ID, user.Id)/360;
            //     user.Processing = ((double)(_repo.CountItemMyCourse(user.Course.ID, user.Id) / (double)_repo.CountItem(user.Course.ID)))*100;
            // }


            //  if  (courses.Image!=null)
            //     {
            //         courses.Image = BaseURL.GetBaseUrl(Request) + "/Upload/" + courses.Image;
            //     }
            // var courseToReturn = _mapper.Map<UserForListDto>(users);



            return Ok(users);
        }

        [AllowAnonymous]
        [HttpGet("GetUserCourse/{courseId}/{userId}")]
        public async Task<IActionResult> GetUserCourse(int courseId, int userId)
        {
            var users = await _repo.GetUserCourse(courseId, userId);
            // foreach (var user in users)
            // {
            //     user.Course = _repo.FindCourseByUserCourse(user.UserCourseId);
            //     user.Duration = _repo.FindDuration(user.Course.ID, user.Id)/360;
            //     user.Processing = ((double)(_repo.CountItemMyCourse(user.Course.ID, user.Id) / (double)_repo.CountItem(user.Course.ID)))*100;
            // }


            //  if  (courses.Image!=null)
            //     {
            //         courses.Image = BaseURL.GetBaseUrl(Request) + "/Upload/" + courses.Image;
            //     }
            // var courseToReturn = _mapper.Map<UserForListDto>(users);



            return Ok(users);
        }

        [AllowAnonymous]
        [HttpPost("AddProcessStudy")]
        public async Task<ActionResult> AddProcessStudy(ProcessStudy processStudy)
        {
            processStudy.CreatedAt = DateTime.Now;
            processStudy.UpdatedAt = DateTime.Now;
            _repo.Add(processStudy);
            await _repo.SaveAll();
            // foreach (var item in userCourseMutiple.UserId)
            // {
            //     UserCourse userCourse = new UserCourse {
            //                 CourseId = userCourseMutiple.CourseId,
            //                 UserId = item,
            //                 CreatedAt = DateTime.Now
            //                 };
            //     _repo.Add(userCourse);
            //     await _repo.SaveAll();
            // }
            // userCourseMutiple.CreatedAt = DateTime.Now;
            // var ItemToCreate = _mapper.Map<UserCourse>(userCourseMutiple);
            // _repo.Add(ItemToCreate);
            // await _repo.SaveAll();

            return Ok();
        }

        [AllowAnonymous]
        [HttpGet("GetItemProcessStudy/{courseId}/{userId}")]
        public async Task<IActionResult> GetItemProcessStudy(int courseId, int userId)
        {
            var courses = await _repo.LessonByUserCourse(courseId, userId);

            return Ok(courses);
        }

        [AllowAnonymous]
        [HttpGet("GetProcessUserCourse/{courseId}/{userId}")]
        public async Task<IActionResult> GetProcessUserCourse(int courseId, int userId)
        {
            var users = await _repo.ProcessUserCourse(courseId, userId);
            // foreach (var user in users)
            // {
            //     user.Course = _repo.FindCourseByUserCourse(user.UserCourseId);
            //     user.Duration = _repo.FindDuration(user.Course.ID, user.Id)/360;
            //     user.Processing = ((double)(_repo.CountItemMyCourse(user.Course.ID, user.Id) / (double)_repo.CountItem(user.Course.ID)))*100;
            // }


            //  if  (courses.Image!=null)
            //     {
            //         courses.Image = BaseURL.GetBaseUrl(Request) + "/Upload/" + courses.Image;
            //     }
            // var courseToReturn = _mapper.Map<UserForListDto>(users);



            return Ok(users);
        }

    }
}
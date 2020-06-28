using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Learning.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Learning.API.Data
{
    public class CourseRepository : ICourseRepository
    {
        private readonly DataContext _context;
        public CourseRepository(DataContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }


        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<IEnumerable<Course>> GetCourses()
        {
            var courses = await _context.Courses.Include(c => c.CourseCategory).Include(uc => uc.UserCourses).OrderByDescending(c => c.ID).ToListAsync();
            foreach (var course in courses)
            {
                course.CountLesson = CountLesson(course.ID);
                course.CountUser = course.UserCourses.Count();
                course.SumDuration = SumDuration(course.ID);
                course.SumVeneuOfCourse = course.UserCourses.Count() * (double)course.Price;
            }
            return courses;
        }

        public async Task<Course> GetMyCourse(int id, int userId)
        {
            var course = await _context.Courses.Include(c => c.CourseCategory).Include(l => l.Lessons)
            .Include(uc => uc.UserCourses).Include(rv => rv.Reviews)
            .FirstOrDefaultAsync(c => c.ID == id);
            course.CountLesson = CountLesson(id);
            course.CountUser = course.UserCourses.Count();
            course.CountItem = CountItem(id);
            course.SumDuration = SumDuration(id);
            course.AvengeRating = AvergeRating(id);
            course.CountRating = course.Reviews.Count();
            course.SumVeneuOfCourse = course.UserCourses.Count() * (double)course.Price;
            double count = ((double)(CountItemMyCourse(id, userId) / (double)course.CountItem))*100;
            course.Processing = ((double)(CountItemMyCourse(id, userId) / (double)course.CountItem))*100;
            return course;
        }

        public async Task<IEnumerable<Course>> GetCoursesByCate(int id)
        {
            var courses = await _context.Courses.Include(c => c.CourseCategory).Where(c => c.CourseCategoryID == id).OrderByDescending(c => c.ID).ToListAsync();

            return courses;
        }

        public async Task<Course> GetCourse(int id)
        {
            var course = await _context.Courses.Include(c => c.CourseCategory).Include(l => l.Lessons)
            .Include(uc => uc.UserCourses).Include(rv => rv.Reviews)
            .FirstOrDefaultAsync(c => c.ID == id);
            course.CountLesson = CountLesson(id);
            course.CountUser = course.UserCourses.Count();
            course.SumDuration = SumDuration(id);
            course.AvengeRating = AvergeRating(id);
            course.CountRating = course.Reviews.Count();
            course.SumVeneuOfCourse = course.UserCourses.Count() * (double)course.Price;
            return course;
        }

        public void Entry<T>(T entity) where T : class
        {
            _context.Entry(entity);
        }

        public int GetCourseMaxID()
        {
            int id = _context.Courses.Max(c => c.ID);
            return id;
        }

        public async Task<IEnumerable<Course>> GetCoursesNew()
        {
            var courses = await _context.Courses.OrderByDescending(c => c.CreatedDate).Take(8).ToListAsync();

            return courses;
        }

        public int CountLesson(int id)
        {


            int count = _context.Lessons.Include(l => l.Items).Where(l => l.CourseId == id).Count();
            return count;

        }

        public double SumDuration(int id)
        {
            double count = (double)(from item in _context.Items
                                    join lesson in _context.Lessons on item.LessonId equals lesson.Id
                                    join course in _context.Courses on lesson.CourseId equals course.ID
                                    join file in _context.Files on item.FileId equals file.Id
                                    where lesson.CourseId == id
                                    select file.Duration).Sum();
            return count;

        }
        public int CountItem(int id)
        {
            int count = (from item in _context.Items
                         join lesson in _context.Lessons on item.LessonId equals lesson.Id
                         join course in _context.Courses on lesson.CourseId equals course.ID
                         join file in _context.Files on item.FileId equals file.Id
                         where lesson.CourseId == id
                         select item.Duration).Count();
            return count;

        }

        public double AvergeRating(int id)
        {
            double count = _context.Reviews.Where(rv => rv.CourseId == id).Select(r => r.Rating).DefaultIfEmpty(0).Average();
            return count;

        }


        public Task<IEnumerable<Course>> AddCourseUser(int id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<IEnumerable<Review>> GetReviews(int id)
        {
            var review = await _context.Reviews.Include(u => u.User).Where(r => r.CourseId == id)
            .ToListAsync();
            return review;
        }



        public int CountItemMyCourse(int userId, int courseId)
        {
              int values = (from p in _context.ProcessStudies
                         join uc in _context.UserCourses on p.IdUserCourse equals uc.Id
                         join i in _context.Items on p.ItemId equals i.Id
                         where uc.CourseId == userId && uc.UserId == courseId
                         select p).Count();
            return values;
        }
        public int CountItemByCourse(int courseId)
        {
              int values = (from p in _context.ProcessStudies
                         join uc in _context.UserCourses on p.IdUserCourse equals uc.Id
                         join i in _context.Items on p.ItemId equals i.Id
                         where uc.UserId == courseId
                         select p).Count();
            return values;
        }

        public async Task<IEnumerable<User>> GetStudentByCouresAll()
        {
            // var userList = await (from user in _context.Users
            //                     join userRole in _context.UserRoles on user.Id equals userRole.UserId
                                
            //                     where userRole.RoleId == 1
            //                     select user ).Include(p => p.Photos).ToListAsync();
            var userList = (from uc in _context.UserCourses
                            join u in _context.Users on uc.UserId equals u.Id
                            join c in _context.Courses on uc.CourseId equals c.ID
                            select new User {
                                Id = uc.UserId,
                                UserCourseId = uc.Id,
                                FirstName = u.FirstName,
                                LastName = u.LastName,
                                Course = c,
                            }).ToList();
            userList.ForEach(uc => uc.Duration = FindDuration(uc.Course.ID, uc.Id)/360);
            userList.ForEach(uc => uc.Processing = uc.Processing = ((double)(CountItemMyCourse(uc.Course.ID, uc.Id) / (double)CountItem(uc.Course.ID)))*100);
                                 

            return userList;
        }
        public async Task<IEnumerable<User>> GetStudentByCoures(int course)
        {
            // var userList = await (from user in _context.Users
            //                     join userRole in _context.UserRoles on user.Id equals userRole.UserId
                                
            //                     where userRole.RoleId == 1
            //                     select user ).Include(p => p.Photos).ToListAsync();
            var userList = from u in _context.Users
                        join uc in _context.UserCourses on u.Id equals uc.UserId
                        where uc.CourseId == course
                        select u;
            
            foreach (var user in userList)
            {
                user.UserCourseId = FindUserCourse(user.Id,course);
                user.Course = FindCourseByUserCourse(user.UserCourseId);
                user.Duration = FindDuration(course, user.Id)/360;
                user.Processing = ((double)(CountItemMyCourse(course, user.Id) / (double)CountItem(course)))*100;
            }
            return userList;
        }

        public double FindDuration(int courseId, int userId) {
            double rs = (double)(from uc in _context.UserCourses
                    join pr in _context.ProcessStudies on uc.Id equals pr.IdUserCourse
                    join chap in _context.Items on pr.ItemId equals chap.Id
                    join file in _context.Files on chap.FileId equals file.Id
                    where uc.CourseId == courseId && uc.UserId == userId
                    select file.Duration).Sum();
            return rs;
        }

        public int FindUserCourse(int userId, int courseId) {
            int rs = _context.UserCourses.Where(uc => uc.UserId == userId && uc.CourseId == courseId).Select(uc => uc.Id).First();
            return rs;
        }
        
        public Course FindCourseByUserCourse(int userCourseId) {
            var rs = (from c in _context.Courses
                    join uc in _context.UserCourses on c.ID equals uc.CourseId
                    where uc.Id == userCourseId
                    select c).First();
            return rs;
        }

    }
}
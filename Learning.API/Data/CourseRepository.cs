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
            var courses = await _context.Courses.Include(c => c.CourseCategory).OrderByDescending(c => c.ID).ToListAsync();

            return courses;
        }

        public async Task<IEnumerable<Course>> GetCoursesByCate(int id)
        {
            var courses = await _context.Courses.Include(c => c.CourseCategory).Where(c => c.CourseCategoryID == id).OrderByDescending(c => c.ID).ToListAsync();

            return courses;
        }
    
        public async Task<Course> GetCourse(int id)
        {
            var course = await _context.Courses.Include(c => c.CourseCategory).Include(l => l.Lessons).FirstOrDefaultAsync(c => c.ID == id);
            course.CountLesson = CountLesson(id);
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

        public Task<IEnumerable<Course>> AddCourseUser(int id)
        {
            throw new System.NotImplementedException();
        }
    }
}
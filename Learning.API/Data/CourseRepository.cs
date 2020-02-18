using System.Collections.Generic;
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
            var courses = await _context.Courses.ToListAsync();

            return courses;
        }

        public async Task<Course> GetCourse(int id)
        {
            var course = await _context.Courses.FirstOrDefaultAsync(c => c.ID == id);

            return course; 
        }

    }
}
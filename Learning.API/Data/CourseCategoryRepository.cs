using System.Collections.Generic;
using System.Threading.Tasks;
using Learning.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Learning.API.Data
{
   public class CourseCategoryRepository : ICourseCategoryRepository
    {
        private readonly DataContext _context;
        public CourseCategoryRepository(DataContext context)
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
        public async Task<IEnumerable<CourseCategory>> GetCourseCategories()
        {
            var courseCategory = await _context.CourseCategories.ToListAsync();

            return courseCategory;
        }

        public async Task<CourseCategory> GetCourseCategory(int id)
        {
            var courseCate = await _context.CourseCategories.Include(c => c.Courses).FirstOrDefaultAsync(c => c.ID == id);

            return courseCate; 
        }
    }
}
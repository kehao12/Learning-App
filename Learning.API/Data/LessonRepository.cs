using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Learning.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Learning.API.Data
{
    public class LessonRepository : ILessonRepository
    {
        private readonly DataContext _context;
        public LessonRepository(DataContext context)
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
        public async Task<IEnumerable<Lesson>> GetLessons()
        {
            var lessons = await _context.Lessons.ToListAsync();

            return lessons;
        }

        public async Task<Lesson> GetLesson(int id)
        {
            var lesson = await _context.Lessons.FirstOrDefaultAsync(c => c.Id == id);

            return lesson; 
        }
        
         public async Task<IEnumerable<Lesson>> GetLessonByIdCourse(int id)
        {
            var lessons = await _context.Lessons.Where(c => c.CourseId == id).ToListAsync();
            return lessons; 
        }
    }
}
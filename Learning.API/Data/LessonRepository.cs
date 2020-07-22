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
            var lessons = await _context.Lessons.Include(i => i.Items).ToListAsync();

            return lessons;
        }

        public async Task<Lesson> GetLesson(int id)
        {
            var lessons = await _context.Lessons.Include(i => i.Items).FirstOrDefaultAsync(c => c.Id == id);
            lessons.CountItem = lessons.Items.Count();

            return lessons; 
        }
        
         public async Task<IEnumerable<Lesson>> GetLessonByIdCourse(int id)
        {
            var items = await _context.Items.Include(f => f.Files).ToListAsync();
            var lessons = await _context.Lessons.Include(i => i.Items).Where(c => c.CourseId == id)
            .ToListAsync();
            
            foreach (var lesson in lessons)
            {
                lesson.CountItem = lesson.Items.Count();
                foreach( var item in lesson.Items) {
                    item.Files =  _context.Files.Where(f => f.Id == item.Files.Id).First();
                }
            }
            return lessons; 
        }

        public int CountItem(int id)
        {
           var count = _context.Items.Where(c => c.LessonId == id).Count();
           return count;
           
        }
    }
}
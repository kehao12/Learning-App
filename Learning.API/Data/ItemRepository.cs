using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Learning.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Learning.API.Data
{
    public interface IItemRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<IEnumerable<Item>> GetItems();
        Task<Item> GetItem(int id);
        Task<IEnumerable<Item>> GetItemOfLesson(int id);
        Task<IEnumerable<Item>> GetItemByCourse(int id);
        int CountItem(int id);
    }
    public class ItemRepository : IItemRepository
    {
        private readonly DataContext _context;
        public ItemRepository(DataContext context)
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

        public async Task<IEnumerable<Item>> GetItems()
        {
            var items = await _context.Items.Include(f => f.Files).ToListAsync();
            foreach (var item in items)
            {
                item.Duration = item.Files.Duration;
            }
            return items;
        }

        public async Task<Item> GetItem(int id)
        {
            var item = await _context.Items.Include(f => f.Files).FirstOrDefaultAsync(u => u.Id == id);  
            return item;
        }

        public async Task<IEnumerable<Item>> GetItemOfLesson(int id)
        {
            
            var items = await _context.Items.Include(f => f.Files).Where(i => i.LessonId == id).ToListAsync();
                       
            return items;
                       
            
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public int CountItem(int id)
        {
           var count = _context.Items.Where(c => c.LessonId == id).Count();
           return count;
        }

        public async Task<IEnumerable<Item>> GetItemByCourse(int id)
        {
            
          var items = from item in _context.Items
                        join lesson in _context.Lessons on   item.LessonId equals lesson.Id
                        join course in _context.Courses on lesson.CourseId equals course.ID
                        join file in _context.Files on item.FileId equals file.Id
                        where lesson.CourseId == id
                        select item; 
                       
            return items;
        }
     
    }
}   
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Learning.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Learning.API.Data
{
    public interface IFileRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<IEnumerable<File>> GetFiles();
        Task<File> GetFile(int id);
        int GetFileMaxID();
    }
    public class FileRepository : IFileRepository
    {
        private readonly DataContext _context;
        public FileRepository(DataContext context)
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

        public async Task<IEnumerable<File>> GetFiles()
        {
            var files = await _context.Files.ToListAsync();

            return files;
        }

        public async Task<File> GetFile(int id)
        {
            var file = await _context.Files.FirstOrDefaultAsync(c => c.Id == id);

            return file; 
        }

        public int GetFileMaxID()
        {
            int id = _context.Files.Max(c => c.Id);
            return id;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}   
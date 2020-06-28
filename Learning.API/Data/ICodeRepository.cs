using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Learning.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Learning.API.Data
{
    public interface ICodeRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<IEnumerable<Code>> GetCodes();
        Task<Code> GetCode(string code);
        Task<Code> GetCodeInt(int code);
        Task<IEnumerable<CodeCourse>> GetCodesCourse(int id);
    }

    public class CodeRepository : ICodeRepository
    {
        private readonly DataContext _context;
        public CodeRepository(DataContext context)
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



        public Task<Code> GetCode(string code)
        {
            var rs = _context.Codes.FirstOrDefaultAsync(u => u.CodeID == code);
            return rs;
        }

        public Task<Code> GetCodeInt(int code)
        {
            var rs = _context.Codes.FirstOrDefaultAsync(u => u.Id == code);
            return rs;
        }
        

        public Task<IEnumerable<Code>> GetCodes()
        {
            throw new System.NotImplementedException();
        }

        public async Task<IEnumerable<CodeCourse>> GetCodesCourse(int id)
        {
            var code = await _context.CodeCourses.Where(c => c.CodeID == id).ToListAsync();
            return code;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
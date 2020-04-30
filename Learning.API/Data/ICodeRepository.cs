using System.Collections.Generic;
using System.Threading.Tasks;
using Learning.API.Models;

namespace Learning.API.Data
{
    public interface ICodeRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<IEnumerable<Code>> GetCodes();
        Task<Code> GetCode(int id);
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



        public Task<Code> GetCode(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<Code>> GetCodes()
        {
            throw new System.NotImplementedException();
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
using System.Collections.Generic;
using System.Threading.Tasks;
using Learning.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Learning.API.Data
{
    public interface IExamRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<IEnumerable<Question>> GetQuestions();
        Task<Question> GetQuestion(int id);
    }

    public class ExamRepository : IExamRepository
    {
        private readonly DataContext _context;
        public ExamRepository(DataContext context)
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

        public async Task<Question> GetQuestion(int id)
        {
            var q = await _context.Questions.FirstOrDefaultAsync(c => c.Id == id);

            return q;
        }

        public async Task<IEnumerable<Question>> GetQuestions()
        {
            var q = await _context.Questions.Include(a => a.Answer).ToListAsync();

            return q;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
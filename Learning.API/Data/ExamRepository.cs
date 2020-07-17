using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Learning.API.DTOs;
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
        Task<Answer> GetAnswer(int id);
        Task<Test> GetExam(int id);
        Task<IEnumerable<Question>> GetQuestionsByTest(int id);
        Task<IEnumerable<TestQuestion>> GetTestQuestion(int id);
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
            var q = await _context.Questions.Include(a => a.Answer).FirstOrDefaultAsync(c => c.Id == id);

            return q;
        }

        public async Task<Answer> GetAnswer(int id)
        {
            var rs = await _context.Answers.FirstOrDefaultAsync(a => a.Id == id);

            return rs;
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

        public async Task<Test> GetExam(int id)
        {
             var rs = await _context.Tests.FirstOrDefaultAsync(t => t.Id == id);

            return rs;
        }

        public async Task<IEnumerable<Question>> GetQuestionsByTest(int id)
        {
            var rs = await (from t in _context.TestQuestions
                    join q in _context.Questions on t.QuestionId equals q.Id
                    where t.TestId == id
                    select q).ToListAsync();

            return rs;
        }
       public async Task<IEnumerable<TestQuestion>> GetTestQuestion(int id)
        {
            var rs = await _context.TestQuestions.Where(t => t.TestId == id).ToListAsync();

            return rs;
        }
    }
}
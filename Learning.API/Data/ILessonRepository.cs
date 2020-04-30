using System.Collections.Generic;
using System.Threading.Tasks;
using Learning.API.Models;

namespace Learning.API.Data
{
    public interface ILessonRepository
    {
       void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<IEnumerable<Lesson>> GetLessons();
        Task<Lesson> GetLesson(int id);
        Task<IEnumerable<Lesson>> GetLessonByIdCourse(int id);

    }
}
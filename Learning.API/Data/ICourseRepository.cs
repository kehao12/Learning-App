using System.Collections.Generic;
using System.Threading.Tasks;
using Learning.API.Models;

namespace Learning.API.Data
{
    public interface ICourseRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<IEnumerable<Course>> GetCourses();
        Task<Course> GetCourse(int id);
    }

}
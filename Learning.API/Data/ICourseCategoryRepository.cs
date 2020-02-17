using System.Collections.Generic;
using System.Threading.Tasks;
using Learning.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Learning.API.Data
{
    public interface ICourseCategoryRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<IEnumerable<CourseCategory>> GetCourseCategories();
        Task<CourseCategory> GetCourseCategory(int id);
    }

 
}
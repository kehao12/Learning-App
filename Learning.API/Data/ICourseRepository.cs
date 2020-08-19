using System.Collections.Generic;
using System.Threading.Tasks;
using Learning.API.DTOs;
using Learning.API.Models;

namespace Learning.API.Data
{
    public interface ICourseRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        void Entry<T>(T entity) where T: class;
        Task<IEnumerable<Course>> GetCourses();
        Task<Course> GetCourse(int id);
        Task<IEnumerable<Course>> GetCoursesNew();
        Task<IEnumerable<Course>> GetCoursesByCate(int id);
        int CountItem(int id);
        int GetCourseMaxID();
        Task<IEnumerable<Review>> GetReviews(int id);
        Task<Course> GetMyCourse(int id, int userId);
        Task<IEnumerable<User>> GetStudentByCoures(int course);
        Task<IEnumerable<User>> GetStudentByCouresAll();
        int FindUserCourse(int userId, int courseId);
        double FindDuration(int courseId, int userId);
        Course FindCourseByUserCourse(int userCourseId);
        int CountItemMyCourse(int userId, int courseId);
        int PriceCourse(int courseId);
        Task<IEnumerable<ItemByUserCourse>> LessonByUserCourse(int idCourse, int idUser);
        Task<IEnumerable<Item>> GetItemByCourse(int id);
        int GiveItemByUserCourse(int courseId, int userId);
        int GiveItemDefault(int courseId);
        int GetUserCourse(int courseId, int userId);
        Task<IEnumerable<ProcessUserCourseDto>> ProcessUserCourse(int idCourse, int idUser);
        int CheckReview(int idUser, int idCourse);
        Task<Review> GetReview(int idUser, int idCourse);

    }

}
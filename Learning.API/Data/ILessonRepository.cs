using System.Threading.Tasks;

namespace Learning.API.Data
{
    public interface ILessonRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
    }
}
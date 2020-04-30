using System.Collections.Generic;
using System.Threading.Tasks;
using Learning.API.Helper;
using Learning.API.Models;

namespace Learning.API.Data
{
    public interface ILearningRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<PaggedList<User>> GetUsers(UserParams userParams);
        Task<User> GetUser(int id);
        Task<User> GetUserByName(string name);
        Task<Photo> GetPhoto(int id);
        Task<Photo> GetMainPhotoForUser(int userId);
      
    }
}
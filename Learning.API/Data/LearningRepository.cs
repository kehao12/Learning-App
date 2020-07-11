using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Learning.API.DTOs;
using Learning.API.Helper;
using Learning.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Learning.API.Data
{
    public class LearningRepository: ILearningRepository
    {
        private readonly DataContext _context;
        public LearningRepository(DataContext context)
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



        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            return await _context.Photos.Where(u => u.UserId == userId)
            .FirstOrDefaultAsync(p => p.IsMain);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);

            return photo; 
        }

        public async Task<IEnumerable<User>> GetAllUser()
        {
            var users = await _context.Users.Include(p => p.Photos).ToListAsync();
            return users;
        }

        public async Task<IEnumerable<User>> GetStudent()
        {
            // var userList = await (from user in _context.Users
            //                     join userRole in _context.UserRoles on user.Id equals userRole.UserId
                                
            //                     where userRole.RoleId == 1
            //                     select user ).Include(p => p.Photos).ToListAsync();
            var userList = await _context.Users.Where(u => u.Position == 1).Include(p => p.Photos).Include(u => u.UserCourses).ToListAsync();
               var values = from u in _context.Users
                        where u.Position == 1 && !u.UserCourses.Any(uc => (uc.CourseId == 1) && (uc.UserId == u.Id))
                        select u;
            return userList;
        }



        
        public async Task<IEnumerable<User>> GetStudentNotRegister(int courseId)
        {

            var userList = from u in _context.Users
                        where u.Position == 1 && !u.UserCourses.Any(uc => (uc.CourseId == courseId) && (uc.UserId == u.Id))
                        select u;
            return userList;
        }
        public async Task<IEnumerable<UserWithRoleDto>> GetTeacher()
        {
             var userList = await (from user in _context.Users.Include(p => p.Photos)
                                    // join photo in _context.Photos on user.Id equals photo.UserId
                                  where user.Position == 2
                                  select new UserWithRoleDto()
                                  {
                                      User = user,
                                      Roles = (from userRole in user.UserRoles
                                               join role in _context.Roles
                                               on userRole.RoleId
                                               equals role.Id
                                               select role.Name).ToList(),
                                               
                                  }).ToListAsync();
                                  
            foreach (var user in userList)
            {
                user.User.PhotoUrl = await _context.Photos.Where(p => p.UserId == user.User.Id && p.IsMain == true).Select(p => p.Url).FirstOrDefaultAsync();
            }
            return (IEnumerable<UserWithRoleDto>)userList;
        }

        
        public async Task<IEnumerable<UserWithRoleDto>> GetAdmin()
        {
             var userList = await (from user in _context.Users.Include(p => p.Photos) 
                                  where user.Position == 3
                                  select new UserWithRoleDto()
                                  {
                                      User = user,
                                      Roles = (from userRole in user.UserRoles
                                               join role in _context.Roles
                                               on userRole.RoleId
                                               equals role.Id
                                               select role.Name).ToList(),
                                               
                                  }).ToListAsync();
                                                                    
            foreach (var user in userList)
            {
                user.User.PhotoUrl = await _context.Photos.Where(p => p.UserId == user.User.Id && p.IsMain == true).Select(p => p.Url).FirstOrDefaultAsync();
            }

            return (IEnumerable<UserWithRoleDto>)userList;
        }
        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.Include(p => p.Photos).Include(u => u.UserCourses).FirstOrDefaultAsync(u => u.Id == id);
          
            return user;
        }

        public async Task<User> GetUserByName(string name)
        {
            var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.UserName == name);
            user.CountCourse = CountCourseByTeacher(name);
            user.CountStudent = CountStudentByTeacher(name);
            
            return user;
        }

        public int CountCourseByTeacher(string name)
        {
            int count = _context.Courses.Where(c => c.CreatedBy == name).Count();
            return count;
        }
        public int CountStudentByTeacher(string name)
        {
            int count = (from uc in _context.UserCourses
                        join c in _context.Courses on uc.CourseId equals c.ID
                        where c.CreatedBy == name
                        select uc).Count();
            return count;
        }
        public  async Task<PaggedList<User>> GetUsers(UserParams userParams)
        {
             var users = _context.Users.Include(p => p.Photos)
                .OrderByDescending(u => u.LastActive).AsQueryable();

            users = users.Where(u => u.Id != userParams.UserId);

            users = users.Where(u => u.Gender == userParams.Gender);

            if (userParams.MinAge != 18 || userParams.MaxAge != 99)
            {
                var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
                var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

                users = users.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);
            }

            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy)
                {
                    case "created":
                        users = users.OrderByDescending(u => u.Created);
                        break;
                    default:
                        users = users.OrderByDescending(u => u.LastActive);
                        break;
                }
            }

            return await PaggedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public int CountItemByCourse(int courseId)
        {
              int values = (from p in _context.ProcessStudies
                         join uc in _context.UserCourses on p.IdUserCourse equals uc.Id
                         join i in _context.Items on p.ItemId equals i.Id
                         where uc.UserId == courseId
                         select p).Count();
            return values;
        }

        

    }
}
using System.Collections.Generic;
using System.Threading.Tasks;
using Learning.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Learning.API.Data
{
    public interface IRoleRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<IEnumerable<Role>> GetRoles();
    }
    public class RoleRepository : IRoleRepository
    {
     private readonly DataContext _context;
        public RoleRepository(DataContext context)
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

        public async Task<IEnumerable<Role>> GetRoles()
        {
            var roles = await _context.Roles.ToListAsync();
            return roles;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
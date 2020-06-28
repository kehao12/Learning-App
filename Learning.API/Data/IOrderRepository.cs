using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Learning.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Learning.API.Data
{
    public interface IOrderRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<IEnumerable<Order>> GetOrders();
        Task<Order> GetOrder(int id);
        // int CountItem(int id);
        // int GetCourseMaxID();
         int GetOrderNew();
    }

    public class OrderRepository : IOrderRepository
    {
        private readonly DataContext _context;
        public OrderRepository(DataContext context)
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

        public async Task<Order> GetOrder(int id)
        {
            var Order = await _context.Orders.Include(o => o.OrderDetail).Include(u => u.User)
            .FirstOrDefaultAsync(or => or.Id == id);
            return Order;
        }

          public int GetOrderNew()
        {
            int order = _context.Orders.Max(c => c.Id);
            return order;
        }

        public async Task<IEnumerable<Order>> GetOrders()
        {
            var orders = await _context.Orders.Include(o => o.OrderDetail).Include(u => u.User).ToListAsync();
            return orders;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }

}
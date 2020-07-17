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
    public interface IStatisticRepository
    {
        Task<IEnumerable<VeneuForDetail>> GetStatisticOfOrder(int id, int month);
        Task<VeneuForDetail> GetOrderOfToday(int day, int month, int year);
        int CountOrderOfToday(int day, int month, int year);
        int CountCourseOfToday(int day, int month, int year);
        int CountRegisterCourseOfToday(int day, int month, int year);

        Task<IEnumerable<Top5CourseDto>> Top5CourseMostSale(int month);
        Task<IEnumerable<Top5CourseDto>> Top5CourseMostSaleDay(int day, int month, int year);
        Task<IEnumerable<Top5CourseDto>> Top5CourseMostSaleYear(int year);
        Task<IEnumerable<Top5CourseDto>> Top5CourseMostVeneu(int month);
        Task<IEnumerable<Top5CourseDto>> Top5CourseMostVeneuDay(int day, int month, int year);
        Task<IEnumerable<Top5CourseDto>> Top5CourseMostVeneuYear(int year);
        Task<IEnumerable<Top5CourseDto>> Top5CourseMostReviewDay(int day, int month, int year);
        Task<IEnumerable<Top5CourseDto>> Top5CourseMostReview(int daystart, int monthstart, int yearstart, int dayend, int monthend, int yearend);
        Task<IEnumerable<Top5CourseDto>> Top5CourseMostSaleAll(int daystart, int monthstart, int yearstart, int dayend, int monthend, int yearend);
        Task<IEnumerable<Top5CourseDto>> Top5CourseMostVeneuAll(int daystart, int monthstart, int yearstart, int dayend, int monthend, int yearend);
        Task<IEnumerable<Top5CourseDto>> Top5CourseMostReviewMonth(int month);
        Task<IEnumerable<Top5CourseDto>> Top5CourseMostReviewYear(int year); 
        Task<IEnumerable<Top5CourseDto>> Top5CourseMostRatingMonth(int month);
        Task<IEnumerable<Top5CourseDto>> Top5CourseMostRatingYear(int year);
        Task<IEnumerable<Top5CourseDto>> Top5CourseMostRegisterYear(int year);
        Task<IEnumerable<Top5CourseDto>> Top5CourseMostRegisterMonth(int month);
        Task<IEnumerable<Top5CourseDto>> Top5CourseMostRegister(int daystart, int monthstart, int yearstart, int dayend, int monthend, int yearend);
        Task<IEnumerable<Top5CourseDto>> Top5CourseMostRating(int daystart, int monthstart, int yearstart, int dayend, int monthend, int yearend);
        Task<IEnumerable<Top5CourseDto>> Top5CourseMostRatingDay(int day, int month, int year);
        Task<IEnumerable<Top5CourseDto>> Top5CourseMostRegisterDay(int day, int month, int year);
        Task<IEnumerable<StatisticVeneuForDto>> GetStatisticVeneu();
        Task<IEnumerable<StatisticVeneuForDto>> GetStatisticVeneuCourse(int id);
        int CountAdmin(int month);
         int CountStudent(int month);
          int CountTeacher(int month);
        

        
    }
    public class StatisticRepository : IStatisticRepository
    {
        private readonly DataContext _context;
        public StatisticRepository(DataContext context)
        {
            _context = context;
        }

        public int CountCourseOfToday(int day, int month, int year)
        {
            int count = _context.Courses
            .Where(o => o.CreatedDate.Day == day && o.CreatedDate.Month == month && o.CreatedDate.Year == year)
            .Count();
            return count;
        }

        public int CountOrderOfToday(int day, int month, int year)
        {
            int count = _context.Orders
            .Where(o => o.CreatedAt.Day == day && o.CreatedAt.Month == month && o.CreatedAt.Year == year)
            .Count();
            return count;
        }

        public int CountRegisterCourseOfToday(int day, int month, int year)
        {
            //  int count = _context.UserCourses
            // .Where(o => o.CreatedAt.Day == day && o.CreatedAt.Month == month && o.CreatedAt.Year == year)
            // .Count();
            // return count;
            return day;
        }

        // Thống kê doanh thu trong ngày
        public async Task<VeneuForDetail> GetOrderOfToday(int day, int month, int year)
        {
            var res = await _context.Orders
            .Where(o => o.CreatedAt.Day == day && o.CreatedAt.Month == month && o.CreatedAt.Year == year)
            .GroupBy(l => l.CreatedAt.Date)
            .Select(v => new VeneuForDetail
            {
                Total = v.Sum(s => s.Total),
                CreatedAt = v.First().CreatedAt.Day
            }).FirstOrDefaultAsync();
            return res;
        }

        // Thống kê doanh thu theo tháng
        public async Task<IEnumerable<VeneuForDetail>> GetStatisticOfOrder(int id, int month)
        {

            var res = await _context.Orders
            .Where(o => o.CreatedAt.Month == month)
            .GroupBy(l => l.CreatedAt.Date)
            .Select(v => new VeneuForDetail
            {
                Total = v.Sum(s => s.Total),
                CreatedAt = v.First().CreatedAt.Day
            })
            .ToListAsync();

            // var orders = await _context.Orders.Where(o => o.Status == 1).ToListAsync();
            return res;

        }

        public async Task<IEnumerable<StatisticVeneuForDto>> GetStatisticVeneu()
        {

            // var res = await _context.Orders
            // .Where(o => o.Status == id && o.CreatedAt.Month == month)
            // .GroupBy(l => l.CreatedAt.Date)
            // .Select(v => new VeneuForDetail
            // {
            //     Total = v.Sum(s => s.Total),
            //     CreatedAt = v.First().CreatedAt.Day
            // })
            // .ToListAsync();
            var rs = from o in _context.Orders  
                    join u in _context.Users on o.UserId equals u.Id    
                    join ord in _context.OrderDetails on o.Id equals ord.OrderId
                    join c in _context.Courses on ord.CourseId equals c.ID
                    select new StatisticVeneuForDto {
                        CreatedAt = o.CreatedAt,
                        Price = ord.Price,
                        NameStudent = u.FirstName + ' ' + u.LastName,
                        NameCourse = c.Name,
                        Status = o.Status
                    };


            // var orders = await _context.Orders.Where(o => o.Status == 1).ToListAsync();
            return rs;

        }

        public async Task<IEnumerable<StatisticVeneuForDto>> GetStatisticVeneuCourse(int id)
        {

            // var res = await _context.Orders
            // .Where(o => o.Status == id && o.CreatedAt.Month == month)
            // .GroupBy(l => l.CreatedAt.Date)
            // .Select(v => new VeneuForDetail
            // {
            //     Total = v.Sum(s => s.Total),
            //     CreatedAt = v.First().CreatedAt.Day
            // })
            // .ToListAsync();
            var rs = from o in _context.Orders  
                    join u in _context.Users on o.UserId equals u.Id    
                    join ord in _context.OrderDetails on o.Id equals ord.OrderId
                    join c in _context.Courses on ord.CourseId equals c.ID
                    where c.ID == id
                    select new StatisticVeneuForDto {
                        CreatedAt = o.CreatedAt,
                        Price = ord.Price,
                        NameStudent = u.FirstName + ' ' + u.LastName,
                        NameCourse = c.Name,
                        Status = o.Status
                    };


            // var orders = await _context.Orders.Where(o => o.Status == 1).ToListAsync();
            return rs;

        }
        // Thống kê đơn hàng
        public async Task<IEnumerable<Top5CourseDto>> Top5CourseMostSale(int month)
        {
            var course = (from c in _context.Courses
                          join or in _context.OrderDetails on c.ID equals or.CourseId
                          join order in _context.Orders on or.OrderId equals order.Id
                          where order.CreatedAt.Month == month
                          group c by c.Name into g
                          select new Top5CourseDto
                          {
                              Name = g.Key,
                              Count = g.Count(),

                          }).OrderByDescending(c => c.Count).Take(5);

            return course;
        }

        public async Task<IEnumerable<Top5CourseDto>> Top5CourseMostSaleDay(int day, int month, int year)
        {
            var course = (from c in _context.Courses
                          join or in _context.OrderDetails on c.ID equals or.CourseId
                          join order in _context.Orders on or.OrderId equals order.Id
                          where order.CreatedAt.Day == day && order.CreatedAt.Month == month && order.CreatedAt.Year == year
                          group c by c.Name into g
                          select new Top5CourseDto
                          {
                              Name = g.Key,
                              Count = g.Count(),

                          }).OrderByDescending(c => c.Count).Take(5);

            return course;
        }

        public async Task<IEnumerable<Top5CourseDto>> Top5CourseMostSaleYear(int year)
        {
            var course = (from c in _context.Courses
                          join or in _context.OrderDetails on c.ID equals or.CourseId
                          join order in _context.Orders on or.OrderId equals order.Id
                          where order.CreatedAt.Year == year
                          group c by c.Name into g
                          select new Top5CourseDto
                          {
                              Name = g.Key,
                              Count = g.Count(),

                          }).OrderByDescending(c => c.Count).Take(5);

            return course;
        }

        public async Task<IEnumerable<Top5CourseDto>> Top5CourseMostSaleAll(int daystart, int monthstart, int yearstart, int dayend, int monthend, int yearend)
        {
            var course = (from c in _context.Courses
                          join or in _context.OrderDetails on c.ID equals or.CourseId
                          join order in _context.Orders on or.OrderId equals order.Id
                          where order.CreatedAt.Day >= daystart && order.CreatedAt.Day <= dayend &&
                            (order.CreatedAt.Month >= monthstart && order.CreatedAt.Month <= monthend) &&
                            (order.CreatedAt.Year >= yearstart && order.CreatedAt.Year <= yearend)
                          group c by c.Name into g
                          select new Top5CourseDto
                          {
                              Name = g.Key,
                              Count = g.Count(),

                          }).OrderByDescending(c => c.Count).Take(5);

            return course;
        }

        // Thông kê doanh thu

        public async Task<IEnumerable<Top5CourseDto>> Top5CourseMostVeneu(int month)
        {
            var course = (from c in _context.Courses
                          join or in _context.OrderDetails on c.ID equals or.CourseId
                          join order in _context.Orders on or.OrderId equals order.Id
                          where order.CreatedAt.Month == month
                          group c by c.Name into g
                          select new Top5CourseDto
                          {
                              Name = g.Key,
                              Count = g.Count(),
                              Total = g.Count() * g.Select(gg => gg.Price).FirstOrDefault()
                          }).OrderByDescending(c => c.Total).Take(5);

            return course;
        }

        public async Task<IEnumerable<Top5CourseDto>> Top5CourseMostVeneuDay(int day, int month, int year)
        {
            var course = (from c in _context.Courses
                          join or in _context.OrderDetails on c.ID equals or.CourseId
                          join order in _context.Orders on or.OrderId equals order.Id
                          where order.CreatedAt.Day == day && order.CreatedAt.Month == month && order.CreatedAt.Year == year
                          group c by c.Name into g
                          select new Top5CourseDto
                          {
                              Name = g.Key,
                              Count = g.Count(),
                              Total = g.Count() * g.Select(gg => gg.Price).FirstOrDefault()
                          }).OrderByDescending(c => c.Total).Take(5);

            return course;
        }

        public async Task<IEnumerable<Top5CourseDto>> Top5CourseMostVeneuYear(int year)
        {
            var course = (from c in _context.Courses
                          join or in _context.OrderDetails on c.ID equals or.CourseId
                          join order in _context.Orders on or.OrderId equals order.Id
                          where order.CreatedAt.Year == year
                          group c by c.Name into g
                          select new Top5CourseDto
                          {
                              Name = g.Key,
                              Count = g.Count(),
                              Total = g.Count() * g.Select(gg => gg.Price).FirstOrDefault()
                          }).OrderByDescending(c => c.Total).Take(5);

            return course;
        }
        public async Task<IEnumerable<Top5CourseDto>> Top5CourseMostVeneuAll(int daystart, int monthstart, int yearstart, int dayend, int monthend, int yearend)
        {
            var course = (from c in _context.Courses
                          join or in _context.OrderDetails on c.ID equals or.CourseId
                          join order in _context.Orders on or.OrderId equals order.Id
                          where order.CreatedAt.Day >= daystart && order.CreatedAt.Day <= dayend &&
                            (order.CreatedAt.Month >= monthstart && order.CreatedAt.Month <= monthend) &&
                            (order.CreatedAt.Year >= yearstart && order.CreatedAt.Year <= yearend)
                          group c by c.Name into g
                          select new Top5CourseDto
                          {
                              Name = g.Key,
                              Count = g.Count(),
                              Total = g.Count() * g.Select(gg => gg.Price).FirstOrDefault()
                          }).OrderByDescending(c => c.Total).Take(5);

            return course;
        }

        // Thống kê review
        public async Task<IEnumerable<Top5CourseDto>> Top5CourseMostReviewMonth(int month)
        {
            var course = (from c in _context.Courses
                          join rv in _context.Reviews on c.ID equals rv.CourseId
                          where rv.CreatedAt.Month == month
                          group c by c.Name into g
                          select new Top5CourseDto
                          {
                              Name = g.Key,
                              Count = g.Count(),
                          }).OrderByDescending(c => c.Count).Take(5);

            return course;
        }

        public async Task<IEnumerable<Top5CourseDto>> Top5CourseMostReviewYear(int year)
        {
            var course = (from c in _context.Courses
                          join rv in _context.Reviews on c.ID equals rv.CourseId
                          where rv.CreatedAt.Year == year
                          group c by c.Name into g
                          select new Top5CourseDto
                          {
                              Name = g.Key,
                              Count = g.Count(),
                          }).OrderByDescending(c => c.Count).Take(5);

            return course;
        }


        public async Task<IEnumerable<Top5CourseDto>> Top5CourseMostReviewDay(int day, int month, int year)
        {
            var course = (from c in _context.Courses
                          join rv in _context.Reviews on c.ID equals rv.CourseId
                          where rv.CreatedAt.Day == day && rv.CreatedAt.Month == month && rv.CreatedAt.Year == year
                          group c by c.Name into g
                          select new Top5CourseDto
                          {
                              Name = g.Key,
                              Count = g.Count(),
                          }).OrderByDescending(c => c.Count).Take(5);

            return course;
        }


        public async Task<IEnumerable<Top5CourseDto>> Top5CourseMostReview(int daystart, int monthstart, int yearstart, int dayend, int monthend, int yearend)
        {
            var course = (from c in _context.Courses
                          join rv in _context.Reviews on c.ID equals rv.CourseId
                          where rv.CreatedAt.Day >= daystart && rv.CreatedAt.Day <= dayend &&
                           (rv.CreatedAt.Month >= monthstart && rv.CreatedAt.Month <= monthend) &&
                           (rv.CreatedAt.Year >= yearstart && rv.CreatedAt.Year <= yearend)
                          group c by c.Name into g
                          select new Top5CourseDto
                          {
                              Name = g.Key,
                              Count = g.Count(),
                          }).OrderByDescending(c => c.Count).Take(5);

            return course;
        }



        // Thống kê rating
        public async Task<IEnumerable<Top5CourseDto>> Top5CourseMostRatingDay(int day, int month, int year)
        {
            var course = (from c in _context.Courses
                          join rv in _context.Reviews on c.ID equals rv.CourseId
                          where rv.CreatedAt.Day == day && rv.CreatedAt.Month == month && rv.CreatedAt.Year == year
                          group c by c.Name into g
                          select new Top5CourseDto
                          {
                              Name = g.Key,
                              Rating = g.Select(gg => gg.Reviews.Average(c => c.Rating)).First(),
                          }).OrderByDescending(c => c.Count).Take(5);

            return course;
        }

        public async Task<IEnumerable<Top5CourseDto>> Top5CourseMostRating(int daystart, int monthstart, int yearstart, int dayend, int monthend, int yearend)
        {
            var course = (from c in _context.Courses
                          join rv in _context.Reviews on c.ID equals rv.CourseId
                          where rv.CreatedAt.Day >= daystart && rv.CreatedAt.Day <= dayend &&
                            (rv.CreatedAt.Month >= monthstart && rv.CreatedAt.Month <= monthend) &&
                            (rv.CreatedAt.Year >= yearstart && rv.CreatedAt.Year <= yearend)
                          group c by c.Name into g
                          select new Top5CourseDto
                          {
                              Name = g.Key,
                              Rating = g.Select(gg => gg.Reviews.Average(c => c.Rating)).First(),
                          }).OrderByDescending(c => c.Count).Take(5);

            return course;
        }

        public async Task<IEnumerable<Top5CourseDto>> Top5CourseMostRatingMonth(int month)
        {
            var course = (from c in _context.Courses
                          join rv in _context.Reviews on c.ID equals rv.CourseId
                          where rv.CreatedAt.Month == month
                          group c by c.Name into g
                          select new Top5CourseDto
                          {
                              Name = g.Key,
                              Rating = g.Select(gg => gg.Reviews.Average(c => c.Rating)).First(),
                          }).OrderByDescending(c => c.Count).Take(5);

            return course;
        }

        public async Task<IEnumerable<Top5CourseDto>> Top5CourseMostRatingYear(int year)
        {
            var course = (from c in _context.Courses
                          join rv in _context.Reviews on c.ID equals rv.CourseId
                          where rv.CreatedAt.Year == year
                          group c by c.Name into g
                          select new Top5CourseDto
                          {
                              Name = g.Key,
                              Rating = g.Select(gg => gg.Reviews.Average(c => c.Rating)).First(),
                          }).OrderByDescending(c => c.Count).Take(5);

            return course;
        }


        // Thống kê đăng ký
        public async Task<IEnumerable<Top5CourseDto>> Top5CourseMostRegisterDay(int day, int month, int year)
        {
            var course = (from c in _context.Courses
                          join uc in _context.UserCourses on c.ID equals uc.CourseId
                          where uc.CreatedAt.Day == day && uc.CreatedAt.Month == month && uc.CreatedAt.Year == year
                          group c by c.Name into g
                          select new Top5CourseDto
                          {
                              Name = g.Key,
                              Count = g.Count()
                          }).OrderByDescending(c => c.Count).Take(5);

            return course;
        }

        public async Task<IEnumerable<Top5CourseDto>> Top5CourseMostRegisterMonth(int month)
        {
            var course = (from c in _context.Courses
                          join uc in _context.UserCourses on c.ID equals uc.CourseId
                          where uc.CreatedAt.Month == month
                          group c by c.Name into g
                          select new Top5CourseDto
                          {
                              Name = g.Key,
                              Count = g.Count()
                          }).OrderByDescending(c => c.Count).Take(5);

            return course;
        }


        public async Task<IEnumerable<Top5CourseDto>> Top5CourseMostRegisterYear(int year)
        {
            var course = (from c in _context.Courses
                          join uc in _context.UserCourses on c.ID equals uc.CourseId
                          where uc.CreatedAt.Year == year
                          group c by c.Name into g
                          select new Top5CourseDto
                          {
                              Name = g.Key,
                              Count = g.Count()
                          }).OrderByDescending(c => c.Count).Take(5);

            return course;
        }


        public async Task<IEnumerable<Top5CourseDto>> Top5CourseMostRegister(int daystart, int monthstart, int yearstart, int dayend, int monthend, int yearend)
        {
            var course = (from c in _context.Courses
                          join uc in _context.UserCourses on c.ID equals uc.CourseId
                          where uc.CreatedAt.Day >= daystart && uc.CreatedAt.Day <= dayend &&
                          (uc.CreatedAt.Month >= monthstart && uc.CreatedAt.Month <= monthend) &&
                          (uc.CreatedAt.Year >= yearstart && uc.CreatedAt.Year <= yearend)
                          group c by c.Name into g
                          select new Top5CourseDto
                          {
                              Name = g.Key,
                              Count = g.Count()
                          }).OrderByDescending(c => c.Count).Take(5);

            return course;
        }
    
        public int CountStudent(int month) {
            int userList;
            if(month == 0) {
                userList = _context.Users.Where(u => u.Position == 1).Count();
            } else 
            {
                userList = _context.Users.Where(u => u.Position == 1 && u.Created.Month == DateTime.Now.Month).Count();
            }
            return userList;
        }
        public int CountTeacher(int month) {
            int userList;
            if(month == 0) {
                userList = _context.Users.Where(u => u.Position == 2).Count();
            } else 
            {
                userList = _context.Users.Where(u => u.Position == 2 && u.Created.Month == DateTime.Now.Month).Count();
            }
            return userList;
        }
        public int CountAdmin(int month) {
            int userList;
            if(month == 0) {
                userList = _context.Users.Where(u => u.Position == 3).Count();
            } else 
            {
                userList = _context.Users.Where(u => u.Position == 3 && u.Created.Month == DateTime.Now.Month).Count();
            }
            return userList;
        }
    }
}
using System;
using System.Threading.Tasks;
using AutoMapper;
using Learning.API.Data;
using Learning.API.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Learning.API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticController : ControllerBase
    {
        private IStatisticRepository _repo;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public StatisticController(DataContext context, IStatisticRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet("GetVenue/{month}")]
        public async Task<IActionResult> GetVenue(int month)
        {
            var value = await _repo.GetStatisticOfOrder(2, month);

            return Ok(value);
        }

        [HttpGet("GetVenueYear/{year}")]
        public async Task<IActionResult> GetVenueYear(int year)
        {
            var value = await _repo.GetStatisticOfOrderMonth(2, year);

            return Ok(value);
        }

        [HttpGet("GetVenueDay/{day}/{month}/{year}")]
        public async Task<IActionResult> GetVenueDay(int day, int month, int year)
        {
            var value = await _repo.GetStatisticOfOrderDay(2, day, month, year);

            return Ok(value);
        }


        [HttpGet("GetVenueToday/{day}/{month}/{year}")]
        public async Task<IActionResult> GetVenueToday(int day, int month, int year)
        {
            var value = await _repo.GetOrderOfToday(day, month, year);

            return Ok(value);
        }

        [HttpGet("GetVenueRange/{daystart}/{monthstart}/{yearstart}/{dayend}/{monthend}/{yearend}")]
        public async Task<IActionResult> GetVenueRange(int daystart, int monthstart, int yearstart, int dayend, int monthend, int yearend)
        {
            var value = await _repo.GetStatisticOfOrderRange(daystart, monthstart, yearstart, dayend, monthend, yearend);

            return Ok(value);
        }
        [HttpGet("GetStatisticVeneu")]
        public async Task<IActionResult> GetStatisticVeneu()
        {
            var value = await _repo.GetStatisticVeneu();

            return Ok(value);
        }

        [HttpGet("GetStatisticVeneuCourse/{courseId}")]
        public async Task<IActionResult> GetStatisticVeneuCourse(int courseId)
        {
            var value = await _repo.GetStatisticVeneuCourse(courseId);

            return Ok(value);
        }

        [HttpGet("CountOrder/{day}/{month}/{year}")]
        public async Task<IActionResult> CountOrder(int day, int month, int year)
        {
            int countOrder = _repo.CountOrderOfToday(day, month, year);

            return Ok(countOrder);
        }
        
        [HttpGet("TimeStudyMonth/{month}/{year}")]
        public async Task<IActionResult> TimeStudyMonth(int month, int year)
        {
            var countOrder = await _repo.TimeStudyMonth(month, year);

            return Ok(countOrder);
        }
                [HttpGet("TimeStudyYear/{year}")]
        public async Task<IActionResult> TimeStudyYear(int id, int year)
        {
            var countOrder = await _repo.TimeStudyYear(id, year);

            return Ok(countOrder);
        }
                        [HttpGet("TimeStudyDay/{day}/{month}/{year}")]
        public async Task<IActionResult> TimeStudyDay(int id,int day, int month, int year)
        {
            var countOrder = await _repo.TimeStudyDay(id, day, month, year);

            return Ok(countOrder);
        }

        [HttpGet("CountOrderMonth/{month}/{year}")]
        public async Task<IActionResult> CountOrderMonth(int month, int year)
        {
            int countOrder = _repo.CountOrderOfMonth(month, year);

            return Ok(countOrder);
        }
        [HttpGet("CountRegisterCourseOfMonth/{month}/{year}")]
        public async Task<IActionResult> CountRegisterCourseOfMonth(int month, int year)
        {
            int countOrder = _repo.CountRegisterCourseOfMonth(month, year);

            return Ok(countOrder);
        }

        [HttpGet("GetStatisticOVenueMonth/{month}/{year}")]
        public async Task<IActionResult> GetStatisticOVenueMonth(int month, int year)
        {
            int countOrder = _repo.GetStatisticOVenueMonth(month, year);

            return Ok(countOrder);
        }

        [HttpGet("CountStudentMonth/{month}/{year}")]
        public async Task<IActionResult> CountStudentMonth(int month, int year)
        {
            var countOrder = await _repo.CountStudentMonth(month, year);

            return Ok(countOrder);
        }
        [HttpGet("CountTeacherMonth/{month}/{year}")]
        public async Task<IActionResult> CountTeacherMonth(int month, int year)
        {
            var countOrder = await _repo.CountTeacherMonth(month, year);

            return Ok(countOrder);
        }
        [HttpGet("CountAdminMonth/{month}/{year}")]
        public async Task<IActionResult> CountAdminMonth(int month, int year)
        {
            var countOrder = await _repo.CountAdminMonth(month, year);

            return Ok(countOrder);
        }

        [HttpGet("CountCourse/{day}/{month}/{year}")]
        public async Task<IActionResult> CountCourse(int day, int month, int year)
        {

            int countCourse = _repo.CountCourseOfToday(day, month, year);
            return Ok(countCourse);
        }


        //Thong ke don hang
        [HttpGet("Top5CourseOrder/{month}")]
        public async Task<IActionResult> Top5CourseOrder(int month)
        {

            var values = await _repo.Top5CourseMostSale(month);
            return Ok(values);
        }
        [HttpGet("Top5CourseOrderDay/{day}/{month}/{year}")]
        public async Task<IActionResult> Top5CourseOrderDay(int day, int month, int year)
        {

            var values = await _repo.Top5CourseMostSaleDay(day, month, year);
            return Ok(values);
        }
        [HttpGet("Top5CourseOrderYear/{year}")]
        public async Task<IActionResult> Top5CourseOrderYear(int year)
        {

            var values = await _repo.Top5CourseMostSaleYear(year);
            return Ok(values);
        }

        [HttpGet("Top5CourseOrderRange/{daystart}/{monthstart}/{yearstart}/{dayend}/{monthend}/{yearend}")]
        public async Task<IActionResult> Top5CourseOrderRange(int daystart, int monthstart, int yearstart, int dayend, int monthend, int yearend)
        {

            var values = await _repo.Top5CourseMostSaleAll(daystart, monthstart, yearstart, dayend, monthend, yearend);
            return Ok(values);
        }


        //Thong ke doanh thu    
        [HttpGet("Top5CourseVenue/{month}")]
        public async Task<IActionResult> Top5CourseVenue(int month)
        {

            var values = await _repo.Top5CourseMostVeneu(month);
            return Ok(values);
        }

        [HttpGet("Top5CourseVenueDay/{day}/{month}/{year}")]
        public async Task<IActionResult> Top5CourseVenueDay(int day, int month, int year)
        {

            var values = await _repo.Top5CourseMostVeneuDay(day, month, year);
            return Ok(values);
        }
        [HttpGet("Top5CourseVenueYear/{year}")]
        public async Task<IActionResult> Top5CourseVenueYear(int year)
        {

            var values = await _repo.Top5CourseMostVeneuYear(year);
            return Ok(values);
        }

        [HttpGet("Top5CourseVenueRange/{daystart}/{monthstart}/{yearstart}/{dayend}/{monthend}/{yearend}")]
        public async Task<IActionResult> Top5CourseVenueRange(int daystart, int monthstart, int yearstart, int dayend, int monthend, int yearend)
        {

            var values = await _repo.Top5CourseMostVeneuAll(daystart, monthstart, yearstart, dayend, monthend, yearend);
            return Ok(values);
        }


        //Thong ke review 
        [HttpGet("Top5CourseReviewDay/{day}/{month}/{year}")]
        public async Task<IActionResult> Top5CourseReviewDay(int day, int month, int year)
        {

            var values = await _repo.Top5CourseMostReviewDay(day, month, year);
            return Ok(values);
        }
        [HttpGet("Top5CourseReview/{daystart}/{monthstart}/{yearstart}/{dayend}/{monthend}/{yearend}")]
        public async Task<IActionResult> Top5CourseReview(int daystart, int monthstart, int yearstart, int dayend, int monthend, int yearend)
        {

            var values = await _repo.Top5CourseMostReview(daystart, monthstart, yearstart, dayend, monthend, yearend);
            return Ok(values);
        }

        [HttpGet("Top5CourseReviewYear/{year}")]
        public async Task<IActionResult> Top5CourseReviewYear(int year)
        {

            var values = await _repo.Top5CourseMostReviewYear(year);
            return Ok(values);
        }

        [HttpGet("Top5CourseReviewMonth/{month}")]
        public async Task<IActionResult> Top5CourseReviewMonth(int month)
        {

            var values = await _repo.Top5CourseMostReviewMonth(month);
            return Ok(values);
        }


        //Thong ke rating
        [HttpGet("Top5CourseRatingDay/{day}/{month}/{year}")]
        public async Task<IActionResult> Top5CourseRatingDay(int day, int month, int year)
        {

            var values = await _repo.Top5CourseMostRatingDay(day, month, year);
            return Ok(values);
        }
        [HttpGet("Top5CourseRating/{daystart}/{monthstart}/{yearstart}/{dayend}/{monthend}/{yearend}")]
        public async Task<IActionResult> Top5CourseRating(int daystart, int monthstart, int yearstart, int dayend, int monthend, int yearend)
        {

            var values = await _repo.Top5CourseMostRating(daystart, monthstart, yearstart, dayend, monthend, yearend);
            return Ok(values);
        }

        [HttpGet("Top5CourseRatingYear/{year}")]
        public async Task<IActionResult> Top5CourseRatingYear(int year)
        {

            var values = await _repo.Top5CourseMostRatingYear(year);
            return Ok(values);
        }

        [HttpGet("Top5CourseRatingMonth/{month}")]
        public async Task<IActionResult> Top5CourseRatingMonth(int month)
        {

            var values = await _repo.Top5CourseMostRatingMonth(month);
            return Ok(values);
        }

        //Thong ke dang ky moi nhat
        [HttpGet("Top5CourseRegisterDay/{day}/{month}/{year}")]
        public async Task<IActionResult> Top5CourseRegisterDay(int day, int month, int year)
        {

            var values = await _repo.Top5CourseMostRegisterDay(day, month, year);
            return Ok(values);
        }
        [HttpGet("Top5CourseRegister/{daystart}/{monthstart}/{yearstart}/{dayend}/{monthend}/{yearend}")]
        public async Task<IActionResult> Top5CourseRegister(int daystart, int monthstart, int yearstart, int dayend, int monthend, int yearend)
        {

            var values = await _repo.Top5CourseMostRegister(daystart, monthstart, yearstart, dayend, monthend, yearend);
            return Ok(values);
        }

        [HttpGet("Top5CourseRegisterYear/{year}")]
        public async Task<IActionResult> Top5CourseRegisterYear(int year)
        {

            var values = await _repo.Top5CourseMostRegisterYear(year);
            return Ok(values);
        }

        [HttpGet("Top5CourseRegisterMonth/{month}")]
        public async Task<IActionResult> Top5CourseRegisterMonth(int month)
        {

            var values = await _repo.Top5CourseMostRegisterMonth(month);
            return Ok(values);
        }

        [HttpGet("CountUser/{month}")]
        public async Task<IActionResult> CountUser(int month)
        {
            int student = _repo.CountStudent(month);
            int teacher = _repo.CountTeacher(month);
            int admin = _repo.CountTeacher(month);
            int[] a = new int[] { student, teacher, admin };


            return Ok(a);
        }
    }
}
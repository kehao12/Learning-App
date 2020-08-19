using System;
namespace Learning.API.DTOs
{
    public class ProcessUserCourseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreateAt { get; set; }
        public double TimeAt { get; set; }
        public int Point { get; set; }
    }
}
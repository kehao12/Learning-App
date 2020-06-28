using System;
using Learning.API.Models;

namespace Learning.API.DTOs
{
    public class UserCourseForListDto
    {
        public int CourseId { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public Course Course { get; set; }
    }
}
using System;

namespace Learning.API.DTOs
{
    public class UserCourseForAddDto
    {
        public int CourseId { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
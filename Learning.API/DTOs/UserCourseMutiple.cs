using System;

namespace Learning.API.DTOs
{
    public class UserCourseMutiple
    {
        public int CourseId { get; set; }
        public int[] UserId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
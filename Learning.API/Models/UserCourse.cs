using System;

namespace Learning.API.Models
{
    public class UserCourse
    {
        public int Id { get; set; }
        public Course Course { get; set; }   
        public int CourseId { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}
namespace Learning.API.Models
{
    public class UserCourse
    {
        public Course Course { get; set; }   
        public int CourseId { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
    }
}
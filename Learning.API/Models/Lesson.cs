namespace Learning.API.Models
{
    public class Lesson
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public Course Course { get; set; }
        public int CourseId { get; set; }

    }
}
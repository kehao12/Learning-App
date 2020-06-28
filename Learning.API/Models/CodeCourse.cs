namespace Learning.API.Models
{
    public class CodeCourse
    {
        public int Id { get; set; }
        public int CodeID { get; set; }
        public Course Course { get; set; }
        public int CourseId { get; set; }
    }

}
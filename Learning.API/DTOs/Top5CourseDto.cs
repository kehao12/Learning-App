namespace Learning.API.DTOs
{
    public class Top5CourseDto
    {
        public string Name { get; set; }
        public int Count { get; set; }
        public decimal Total { get; set; }
        public double Rating { get; set; }
    }
}
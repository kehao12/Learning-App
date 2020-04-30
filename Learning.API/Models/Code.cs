namespace Learning.API.Models
{
    public class Code
    {
        public int Id { get; set; }
        public string CodeID { get; set; }
        public Course Course { get; set; }
        public int CourseId { get; set; }
         public bool Status { set; get; }
    }

}
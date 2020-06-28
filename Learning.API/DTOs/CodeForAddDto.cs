using Learning.API.Models;

namespace Learning.API.DTOs
{
    public class CodeForAddDto
    {   
        public int Id { get; set; }
        public string CodeID { get; set; }
        public int[] CourseId { get; set; }
        public bool Status { set; get; }
    }
}
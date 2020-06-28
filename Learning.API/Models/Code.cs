using System.Collections.Generic;

namespace Learning.API.Models
{
    public class Code
    {
        public int Id { get; set; }
        public string CodeID { get; set; }
        public bool Status { set; get; }
        public ICollection<Course> Course { get; set; }
   
    }

}
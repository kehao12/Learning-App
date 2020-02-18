using System;

namespace Learning.API.DTOs
{
    public class CourseForDetailedDto
    {
        public int ID { get; set; }
       
        public string Name { get; set; }
   
        public string Alias { get; set; }
        
        public string Description { get; set; }

        public string Image { get; set; }
        
        public decimal Price { get; set; }

        public int? ViewCount { get; set; }
        public int CourseCategoryID { get; set; }
        public int UserId { get; set; }
        public DateTime? CreatedDate { set; get; }
        public string CreatedBy { set; get; }
        public DateTime? UpdatedDate { set; get; }
        public string UpdatedBy { set; get; }
        public bool Status { set; get; }
    }
}
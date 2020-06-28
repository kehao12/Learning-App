using System;
using System.Collections.Generic;

namespace Learning.API.DTOs
{
    public class CourseCategoryForDetailedDto
    {
        public int ID { set; get; }
        public string Name { set; get; }
        public string Alias { set; get; }
        public string Description { set; get; }
        public int? ParentID { set; get; }
        public int? DisplayOrder { set; get; }
        public DateTime? CreatedDate { set; get; }
        public string CreatedBy { set; get; }
        public DateTime? UpdatedDate { set; get; }
        public string UpdatedBy { set; get; }
        public bool Status { set; get; }
        
        public ICollection<CourseForDetailedDto> Courses { get; set; }
  
    }
}
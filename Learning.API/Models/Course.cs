using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Learning.API.Models.Abstract;
using Microsoft.AspNetCore.Http;

namespace Learning.API.Models
{
    [Table("Courses")]
    public class Course: Auditable
    {
        
        public int ID { get; set; }
       
        public string Name { get; set; }
   
        public string Alias { get; set; }
        
        public string Description { get; set; }

        public string Image { get; set; }
        
        public decimal Price { get; set; }

        public int? ViewCount { get; set; }

        public CourseCategory CourseCategory { get; set; }
        public int CourseCategoryID { get; set; }

        public ICollection<UserCourse> UserCourses { get; set; }

        [NotMapped]
        public IFormFile File { get; set; }

        public ICollection<Lesson> Lessons { get; set; }

    }
}
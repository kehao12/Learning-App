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
        public string DescriptionMain { get; set; }
        public decimal PriceMain { get; set; }

        public string Image { get; set; }
        
        public decimal Price { get; set; }


        public int? ViewCount { get; set; }
        public int? IdCreatedBy { get; set; }
        public CourseCategory CourseCategory { get; set; }
        public int CourseCategoryID { get; set; }

        public ICollection<UserCourse> UserCourses { get; set; }

        [NotMapped]
        public IFormFile File { get; set; }

        [NotMapped]
        public int? CountLesson { get; set; }

        [NotMapped]
        public int? CountItem { get; set; }

        [NotMapped]
        public int? CountUser { get; set; }
        [NotMapped]
        public double? SumDuration { get; set; }
        [NotMapped]
        public double? SumVeneuOfCourse { get; set; }

        public ICollection<Lesson> Lessons { get; set; }
        
        public ICollection<Review> Reviews { get; set; }

        [NotMapped]
        public double? AvengeRating { get; set; }
        [NotMapped]
        public int? CountRating { get; set; }
        [NotMapped]
        public double? Processing { get; set; }

    }
}
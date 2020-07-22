using System;
using System.Collections.Generic;

namespace Learning.API.DTOs
{
    public class CourseForListDto
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
        public int CourseCategoryID { get; set; }
        public DateTime? CreatedDate { set; get; }
        public string CreatedBy { set; get; }
        public DateTime? UpdatedDate { set; get; }
        public string UpdatedBy { set; get; }
        public bool Status { set; get; }
        public int? CountItem { set; get; }
        public double? SumDuration { get; set; }
        public int? CountUser { get; set; }
        public double? SumVeneuOfCourse { get; set; }

        public double? AvengeRating { get; set; }
        public int? CountRating { get; set; }
        public double? Processing { get; set; }
        public CourseCategoryForListDto CourseCategory { get; set; }
        public ICollection<UserCourseForAddDto> UserCourses { get; set; }
    }
}
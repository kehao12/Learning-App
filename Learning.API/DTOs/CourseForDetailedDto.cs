using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace Learning.API.DTOs
{
    public class CourseForDetailedDto
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
        public int? IdCreatedBy { get; set; }
        public DateTime? UpdatedDate { set; get; }
        public string UpdatedBy { set; get; }
        public bool Status { set; get; }
        public int CountLesson { set; get; }
        public CourseCategoryForListDto CourseCategory { get; set; }
        public IFormFile File { set; get; }
        public ICollection<LessonForDetailDto> Lessons { get; set; }
        public int? CountItem { set; get; }
        public double? SumDuration { get; set; }
        public int? CountUser { get; set; }
        public double? SumVeneuOfCourse { get; set; }
        public double? AvengeRating { get; set; }
        public int? CountRating { get; set; }
        public double? Processing { get; set; }
        public ICollection<UserCourseForAddDto> UserCourses { get; set; }
        public ICollection<ReviewForAddDto> Reviews { get; set; }


    }
}
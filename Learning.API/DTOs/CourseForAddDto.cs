using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace Learning.API.DTOs
{
    public class CourseForAddDto
    {

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
        public int IdCreatedBy { set; get; }
        public DateTime? UpdatedDate { set; get; }
        public string UpdatedBy { set; get; }
        public bool Status { set; get; }

        public IFormFile File { set; get; }
    }
}
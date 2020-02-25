using System;
using Microsoft.AspNetCore.Http;

namespace Learning.API.DTOs
{
    public class CourseCategoryForUpdateDto
    {
        public string Name { set; get; }
        public string Alias { set; get; }
        public string Description { set; get; }
        public int? ParentID { set; get; }
        public int? DisplayOrder { set; get; }
        public DateTime? UpdatedDate { set; get; }
        public string UpdatedBy { set; get; }
        public bool Status { set; get; }

    }
}
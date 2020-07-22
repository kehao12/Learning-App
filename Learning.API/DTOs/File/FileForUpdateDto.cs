using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace Learning.API.DTOs.File
{
    public class FileForUpdateDto
    {
        public string Url { get; set; }
        public int TypeId { get; set; }
        public string PublicId { get; set; }
        public double? Duration  { get; set; }
        public int? TestId { get; set; }
        public IFormFile File { get; set; }

        public DateTime DateAdded { get; set; }
    }
}
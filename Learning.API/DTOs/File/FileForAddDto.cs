using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace Learning.API.DTOs.File
{
    public class FileForAddDto
    {
        public string Url { get; set; }
        public int TypeId { get; set; }
        //   public int ItemId { get; set; }
        public IFormFile File { get; set; }
        
        public string PublicId { get; set; }
   
        public double? Duration  { get; set; }
        public DateTime DateAdded { get; set; }
        public FileForAddDto()
        {
            DateAdded = DateTime.Now;
        }
    }
}
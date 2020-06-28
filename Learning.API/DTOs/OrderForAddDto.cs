using System;

namespace Learning.API.DTOs
{
    public class OrderForAddDto
    {
       
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public int[] CourseId { get; set; }
        public int Status { get; set; }
        
        public int Total { get; set; }
    }
}
using System;
using Learning.API.Models;

namespace Learning.API.DTOs
{
    public class ReviewForAddDto
    {
        public int Id { get; set; }
        public int Rating { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public int CourseId { get; set; }
        public string Comment { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
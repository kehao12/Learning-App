using System;

namespace Learning.API.DTOs
{
    public class ReviewForUpdatedDto
    {
        public int Rating { get; set; }
        public string Comment { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
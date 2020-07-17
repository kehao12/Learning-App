using System;
using Learning.API.Models;

namespace Learning.API.DTOs
{
    public class ExamForUpdatedDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Time { get; set; }
        public DateTime CreatedAt { get; set; }
        public int Point { get; set; }
        public Question[] Questions { get; set; }
    }
}
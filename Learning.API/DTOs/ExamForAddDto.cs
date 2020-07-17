using System;
using System.Collections.Generic;
using Learning.API.Models;

namespace Learning.API.DTOs
{
    public class ExamForAddDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Time { get; set; }
        public DateTime CreatedAt { get; set; }
        public int Point { get; set; }
        public Question[] Questions { get; set; }
        // public ICollection<Question> Questions { get; set; }
    }
}
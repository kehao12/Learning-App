using System;
using System.Collections.Generic;
using Learning.API.Models;

namespace Learning.API.DTOs
{
    public class FileExamForAddDto
    {
        public int TestId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int LessonId { get; set; }
        public int FileId { get; set; }
        public int TypeId { get; set; }
   
    }
}
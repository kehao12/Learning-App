using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Learning.API.Models.Abstract;

namespace Learning.API.Models
{
    public class Item: IAuditable
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Lesson Lesson { get; set; }
        public int LessonId { get; set; }
        public File Files { get; set; }
        
        public int FileId { get; set; } 
        public int Status { get; set; }
        public int Preview { get; set; }

        [NotMapped]
        public double? Duration {get; set;}


    }
}
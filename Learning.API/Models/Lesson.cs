using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Learning.API.Models
{
    public class Lesson
    {
        public int Id { get; set; }
        public string Name { get; set;}
        public string Description { get; set; }
        public Course Course { get; set; }
        public int CourseId { get; set; }

        [NotMapped]
        public int CountItem { get; set; }
         [NotMapped]
        public double DurationItem { get; set; }

       
        public ICollection<Item> Items { get; set; }

    }
}
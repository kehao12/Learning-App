using System.Collections.Generic;
using System.Linq;
using Learning.API.DTOs.Item;

namespace Learning.API.DTOs
{
    public class LessonForDetailDto
    {
        public string Id { get; set;}

        public string Name { get; set;}
        public string CourseId { get; set;}
        public int CountItem { get; set; }
           public int DurationItem { get; set; }

        public ICollection<ItemForDetailedDto> Items {get; set;} 


    }
}
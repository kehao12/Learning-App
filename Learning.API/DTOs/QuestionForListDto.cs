using System.Collections.Generic;
using Learning.API.Models;

namespace Learning.API.DTOs
{
    public class QuestionForListDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public ICollection<Answer> Answer { get; set; }
        public string Url { get; set; }
        public int TypeId { get; set; }
        
    }
}
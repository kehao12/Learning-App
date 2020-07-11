using System.Collections.Generic;

namespace Learning.API.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public ICollection<Answer> Answer { get; set; }
    }
}
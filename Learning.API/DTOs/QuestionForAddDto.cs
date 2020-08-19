using Learning.API.Models;

namespace Learning.API.DTOs
{
    public class QuestionForAddDto
    {
        public string Content { get; set; }
        public Answer[] Answer { get; set; }
        public string Url { get; set; }
        public int TypeId { get; set; }
    }
}
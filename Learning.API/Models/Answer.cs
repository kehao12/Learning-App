namespace Learning.API.Models
{
    public class Answer
    {
        public int Id { get; set; }
        public Question Question { get; set; }    
        public int QuestionId { get; set; }
        public string Content { get; set; }
        public bool AnswerTrue { get; set; }
        public string Description { get; set; }
        
    }
}
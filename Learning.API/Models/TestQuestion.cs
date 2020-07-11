namespace Learning.API.Models
{
    public class TestQuestion
    {
        public int Id { get; set; }
        public Test Test { get; set; }
        public int TestId { get; set; }
        public Question Question { get; set; }
        public int QuestionId { get; set; }
    }
}
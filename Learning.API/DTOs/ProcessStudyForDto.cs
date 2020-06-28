using System;
namespace Learning.API.DTOs
{
    public class ProcessStudyForDto
    {
        public int Id { get; set; }
        public int IdUserCourse { get; set; }
        public int ItemId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int Finish { get; set; }
        public double Duration { get; set; }
    }
}
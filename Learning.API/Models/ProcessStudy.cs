using System;

namespace Learning.API.Models
{
    public class ProcessStudy
    {
        public int Id { get; set; }
        public UserCourse UserCourse { get; set; }
        public int IdUserCourse { get; set; }
        public Item Item { get; set; }
        public int ItemId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int Finish { get; set; }
        public double Duration { get; set; }
        public int Point { get; set; }
    }
}
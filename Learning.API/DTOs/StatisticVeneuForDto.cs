using System;

namespace Learning.API.DTOs
{
    public class StatisticVeneuForDto
    {
        public DateTime CreatedAt { get; set; }
        public int Price { get; set; }
        public string PaymentMethod { get; set; }
        public string NameStudent { get; set; }
        public string NameCourse { get; set; }
        public int Status { get; set; }
    }
}
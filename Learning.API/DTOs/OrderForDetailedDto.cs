using System;
using Learning.API.Models;

namespace Learning.API.DTOs
{
    public class OrderForDetailedDto
    {
       
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public User User { get; set; }
        public OrderDetailForDetailDto[] OrderDetail { get; set; }
        public int Status { get; set; }

        public int Total { get; set; }
        public int? CodeId { get; set; }

    }
}
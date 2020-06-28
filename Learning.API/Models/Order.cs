using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Learning.API.Models
{
    public class Order
    {
        public int Id { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public int Status { get; set; }
        public ICollection<OrderDetail> OrderDetail { get; set; }

        public int Total { get; set; }


        public int? CodeId { get; set; }

    }
}
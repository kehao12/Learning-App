using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Learning.API.Models
{
    public class OrderDetail
    {
        public int Id { get; set; }
        public Course Course { get; set; }
        public int CourseId { get; set; }
        public Order Oder { get; set; }
        public int OrderId { get; set; }
        public int Price { get; set; }
    }
}
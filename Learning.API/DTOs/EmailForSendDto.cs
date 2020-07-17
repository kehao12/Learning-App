using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace Learning.API.DTOs
{
    public class EmailForSendDto
    {
        public string Text { get; set; } 
        public string To { get; set; }
        public int IdOrder { get; set; }
    }
}
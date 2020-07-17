using System.ComponentModel.DataAnnotations.Schema;
using Learning.API.Models.Abstract;
using Microsoft.AspNetCore.Http;

namespace Learning.API.Models
{
    public class File
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public Type Type { get; set; }
        public int TypeId { get; set; }
        public string PublicId { get; set; }
        public double? Duration  { get; set; }
        public int? TestId { get; set; }
    
    }
}
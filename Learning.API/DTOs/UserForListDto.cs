using System;
using Learning.API.Models;

namespace Learning.API.DTOs
{
    public class UserForListDto
    {
   
        public int Id { get; set; }
        public string Username { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string PhotoUrl { get; set; }
        public int Position { get; set; }
        public double? Processing { get; set; }
        public double? Duration { get; set; }
        public int? UserCourseId { get; set; }
        public Course Course { get; set; }
        public DateTime? CreatedCourse { get; set; }
        public int? CountCourse { get; set; }
        public int? CountStudent { get; set; }
    }
}
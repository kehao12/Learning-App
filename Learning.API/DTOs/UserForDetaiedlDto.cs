using System;
using System.Collections.Generic;
using Learning.API.Models;

namespace Learning.API.DTOs
{
    public class UserForDetailedDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Introduction { get; set; }
        public string Address { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PhotoUrl { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string FullName { get; set;}
        public string Email { get; set; }
        public string Phone { get; set; }
        public ICollection<PhotosForDetailedDto> Photos { get; set; }
        public ICollection<UserCourseForAddDto> UserCourses { get; set; }

        public UserForDetailedDto()
        {
            FullName = FirstName + ' ' + LastName;
        }
        public double? Processing { get; set; }
        public double? Duration { get; set; }
        public int? UserCourseId { get; set; }
        public Course Course { get; set; }
        public DateTime? CreatedCourse { get; set; }
        public int? CountCourse { get; set; }
        public int? CountStudent { get; set; }
    }
}
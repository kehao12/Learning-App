using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Learning.API.Models
{
    public class User : IdentityUser<int>
    {
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Introduction { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int Position { get; set; }
      
        public ICollection<Photo> Photos { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
        public ICollection<UserCourse> UserCourses { get; set; }
        
        public ICollection<Review> Reviews { get; set; }
        [NotMapped]
        public double? Processing { get; set; }

        [NotMapped]
        public double? Duration { get; set; }
        
        [NotMapped]
        public int UserCourseId { get; set; }
        [NotMapped]
        public Course Course { get; set; }

        [NotMapped]
        public DateTime? CreatedCourse { get; set; }
        [NotMapped]
        public int? CountCourse { get; set; }
        [NotMapped]
        public int? CountStudent { get; set; }
        [NotMapped]
        public string PhotoUrl { get; set; }
    }
}
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Learning.API.Models
{
    public class Role : IdentityRole<int>
    {
        public ICollection<UserRole> UserRoles { get; set; }
        public string NameVN { get; set; }
        public string Group { get; set; }
    }
}
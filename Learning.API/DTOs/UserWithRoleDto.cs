using System;
using System.Collections.Generic;
using Learning.API.Models;

namespace Learning.API.DTOs
{
    public class UserWithRoleDto
    {
        public User User { get; set; }

        public List<string> Roles { get; set; }

    }
}
using Learning.API.Models;

namespace Learning.API.DTOs
{
    public class StudentForListDto
    {
        public User User { get; set; }
        public int[] Roles { get; set; }
    }
}
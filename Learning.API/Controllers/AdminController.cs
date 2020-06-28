using System.Threading.Tasks;
using Learning.API.Data;
using Learning.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Learning.API.DTOs;

namespace Learning.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;
        public AdminController(DataContext context, UserManager<User> userManager)
        {
            _userManager = userManager;
            _context = context;
        }

        // Lấy quyền của người dùng
        [HttpGet("usersWithRoles")]
        public async Task<IActionResult> GetUsersWithRoles()
        {
            // Lấy danh sách quyền của người dùng
            var userList = await (from user in _context.Users
                                  orderby user.UserName
                                  select new
                                  {
                                      Id = user.Id,
                                      UserName = user.UserName,
                                      Roles = (from userRole in user.UserRoles
                                               join role in _context.Roles
                                               on userRole.RoleId
                                               equals role.Id
                                               select role.Name).ToList(),
                                               
                                  }).ToListAsync();
            return Ok(userList);
        }

        // Chỉnh sửa quyền người dùng

        [HttpPost("editRoles/{userName}")]
        public async Task<IActionResult> EditRoles(string userName, RoleEditDto roleEditDto)
        {
            // Lấy dữ liệu người dùng
            var user = await _userManager.FindByNameAsync(userName);

            // Lấy quyền người dùng
            var userRoles = await _userManager.GetRolesAsync(user);

            // Quyền được chọn
            var selectedRoles = roleEditDto.RoleNames;

            // Nếu quyền được chọn khác null thì khởi tạo mảng string và chứa dữ liệu quyền
            // selectedRoles = selectedRoles != null ? selectedRoles : new string[]
            selectedRoles = selectedRoles ?? new string[] {};

            // Thêm quyền đã chọn
            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if (!result.Succeeded)
                return BadRequest("Thêm quyền không thành công");

            // Xoá quyền đã chọn
            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if (!result.Succeeded)
                return BadRequest("Xoá quyền không thành công");

         
            return Ok(await _userManager.GetRolesAsync(user));
        }

        // [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("photosForModeration")]
        public IActionResult GetPhotosForModeration()
        {
            return Ok("Admins or moderators can see this");
        }

        [HttpGet("getRole")]
        public async Task<IActionResult> getRole()
        {
            var role = _context.Roles.ToListAsync();   
            return Ok(role);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using Learning.API.Data;
using Learning.API.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace DatingApp.API.Data
{
    public class Seed
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        public Seed(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public void SeedUsers() 
        {
           if (!_userManager.Users.Any())
            {
                string [] roleAdmin;

                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);

                // create some roles
                var roles = new List<Role>
                {
                    new Role{Name = "AddAdmin",NameVN="Thêm người quản trị",Group="Quản trị"},
                    new Role{Name = "EditAdmin",NameVN="Chỉnh sửa quyền quản trị",Group="Quản trị"},
                    new Role{Name = "ViewAdmin",NameVN="Xem danh sách người quản trị",Group="Quản trị"},
                    new Role{Name = "AddStudent", NameVN = "Thêm học viên",Group="Học viên"},
                    new Role {Name = "DeleteStudent", NameVN =" Xoá học viên",Group="Học viên"},
                    new Role {Name = "ViewStudentList", NameVN =" Xem danh sách học viên",Group="Học viên"},
                    new Role {Name = "ViewStudent", NameVN =" Xem thông tin học viên",Group="Học viên"},
                    new Role {Name = "AddTeacher", NameVN =" Thêm giảng viên",Group="Giảng viên"},
                    new Role {Name = "DeleteTeacher", NameVN =" Xoá giảng viên",Group="Giảng viên"},
                    new Role {Name = "ViewTeacherList", NameVN =" Xem danh sách giảng viên",Group="Giảng viên"},
                    new Role {Name = "ViewTeacher", NameVN =" Xem thông tin giảng viên",Group="Giảng viên"},
                    new Role {Name ="CreatOrder", NameVN = "Tạo giao dịch",Group="Giao dịch"},
                    new Role {Name = "DeleteOrder", NameVN =" Xoá giao dịch",Group="Giao dịch"},
                    new Role {Name = "EditStatusOrder", NameVN ="Chuyển trạng thái giao dịch",Group="Giao dịch"},
                    new Role {Name = "ViewOrderList", NameVN ="Xem toàn bộ giao dịch",Group="Giao dịch"},
                    new Role {Name = "ViewMyOrder", NameVN =" Chỉ xem các giao dịch mà họ tạo",Group="Giao dịch"},
                    new Role {Name = "CreateCode", NameVN ="Tạo mã kích hoạt",Group="Giao dịch"},
                    new Role {Name = "EidtCode", NameVN ="Sửa mã kích hoạt",Group="Giao dịch"},
                    new Role {Name = "CreateCategory", NameVN ="Tạo danh mục khoá học",Group="Danh mục"},
                    new Role {Name = "EditCategory", NameVN ="Sửa danh mục khoá học",Group="Danh mục"},
                    new Role {Name = "DeleteCategory", NameVN ="Xoá danh mục khoá học",Group="Danh mục"},
                    new Role {Name = "CreateCourse", NameVN ="Tạo khoá học",Group="Khoá học"},
                    new Role {Name = "EditCourse", NameVN ="Sửa khoá học",Group="Khoá học"},
                    new Role {Name = "DeleteCourse", NameVN ="Xoá khoá học",Group="Khoá học"},
                    new Role {Name = "ViewCourse", NameVN ="Xem thông tin khoá học",Group="Khoá học"},
                    new Role {Name = "ViewCourseList", NameVN ="Xem toàn bộ danh sách khoá học",Group="Khoá học"},
                    new Role {Name = "ViewMyCourse", NameVN ="Chỉ xem danh sách khoá học mà học tạo",Group="Khoá học"},
                    new Role {Name = "ViewReportRevenueCourse", NameVN ="Xem báo cáo doanh thu của khoá học",Group="Khoá học"},
                    new Role {Name = "ViewReportStudentCourse", NameVN ="Xem báo cáo học viên của khoá học",Group="Khoá học"},
                    new Role {Name = "ViewReportProcessCourse", NameVN ="Xem tiến trình học tập của khoá học",Group="Khoá học"},
                    

                };

                foreach (var role in roles)
                {   
                     _roleManager.CreateAsync(role).Wait();
                    
                     
                }

                foreach (var user in users)
                {
                     _userManager.CreateAsync(user, "password").Wait();
                    //  _userManager.AddToRoleAsync(user, "Member").Wait();
                }

                // create admin user
                var adminUser = new User
                {
                    UserName = "Admin"
                };

                IdentityResult result = _userManager.CreateAsync(adminUser, "password").Result;

                if (result.Succeeded)
                {
                    var admin =  _userManager.FindByNameAsync("Admin").Result;


                foreach (var role in roles)
                {   
                      _userManager.AddToRoleAsync(admin,role.Name).Wait();
                     
                }
                   
                    
                     
                }
            }

        }

  
    }
}
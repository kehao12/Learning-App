using Learning.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Learning.API.Data
{
    public class DataContext : IdentityDbContext<User, Role, int,
    IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>,
    IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Value> Values { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<CourseCategory> CourseCategories { get; set; }
        public DbSet<Slide> Slides { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<UserCourse> UserCourses { get; set; }
        public DbSet<File> Files { get; set; }
        public DbSet<Type> Types { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Code> Codes { get; set; }
        public DbSet<CodeCourse> CodeCourses { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<ProcessStudy> ProcessStudies { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Test> Tests { get; set; }
        public DbSet<TestQuestion> TestQuestions { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserRole>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });

            //  builder.Entity<UserCourse>(userCourse => 
            // {
            //     userCourse.HasKey(uc => new {uc.UserId, uc.CourseId});

            //     userCourse.HasOne(uc => uc.Course)
            //         .WithMany(c => c.UserCourses)
            //         .HasForeignKey(uc => uc.CourseId)
            //         .IsRequired();

            //     userCourse.HasOne(uc => uc.User)
            //         .WithMany(u => u.UserCourses)
            //         .HasForeignKey(uc => uc.UserId)
            //         .IsRequired();
            // });
        }
    }
}
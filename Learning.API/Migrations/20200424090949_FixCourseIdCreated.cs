using Microsoft.EntityFrameworkCore.Migrations;

namespace Learning.API.Migrations
{
    public partial class FixCourseIdCreated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdCreatedBy",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<int>(
                name: "IdCreatedBy",
                table: "Courses",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdCreatedBy",
                table: "Courses");

            migrationBuilder.AddColumn<int>(
                name: "IdCreatedBy",
                table: "AspNetUsers",
                nullable: true);
        }
    }
}

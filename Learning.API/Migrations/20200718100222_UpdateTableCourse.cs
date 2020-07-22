using Microsoft.EntityFrameworkCore.Migrations;

namespace Learning.API.Migrations
{
    public partial class UpdateTableCourse : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DescriptionMain",
                table: "Courses",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "PriceMain",
                table: "Courses",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DescriptionMain",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "PriceMain",
                table: "Courses");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace Learning.API.Migrations
{
    public partial class FixUserAndRoleGroup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Group",
                table: "AspNetRoles",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Group",
                table: "AspNetRoles");
        }
    }
}

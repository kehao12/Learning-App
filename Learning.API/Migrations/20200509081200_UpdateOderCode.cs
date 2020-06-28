using Microsoft.EntityFrameworkCore.Migrations;

namespace Learning.API.Migrations
{
    public partial class UpdateOderCode : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CodeId",
                table: "Orders",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Total",
                table: "Orders",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CodeId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Total",
                table: "Orders");
        }
    }
}

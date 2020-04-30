using Microsoft.EntityFrameworkCore.Migrations;

namespace Learning.API.Migrations
{
    public partial class FixUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Files_ItemId",
                table: "Files");

            migrationBuilder.AddColumn<int>(
                name: "IdCreatedBy",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Files_ItemId",
                table: "Files",
                column: "ItemId",
                unique: true,
                filter: "[ItemId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Files_ItemId",
                table: "Files");

            migrationBuilder.DropColumn(
                name: "IdCreatedBy",
                table: "AspNetUsers");

            migrationBuilder.CreateIndex(
                name: "IX_Files_ItemId",
                table: "Files",
                column: "ItemId");
        }
    }
}

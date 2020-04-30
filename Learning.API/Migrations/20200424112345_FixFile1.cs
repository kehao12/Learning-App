using Microsoft.EntityFrameworkCore.Migrations;

namespace Learning.API.Migrations
{
    public partial class FixFile1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Files_Items_ItemId",
                table: "Files");

            migrationBuilder.DropIndex(
                name: "IX_Files_ItemId",
                table: "Files");

            migrationBuilder.DropColumn(
                name: "ItemId",
                table: "Files");

            migrationBuilder.AddColumn<int>(
                name: "FileId",
                table: "Items",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Items_FileId",
                table: "Items",
                column: "FileId");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Files_FileId",
                table: "Items",
                column: "FileId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Files_FileId",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Items_FileId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "FileId",
                table: "Items");

            migrationBuilder.AddColumn<int>(
                name: "ItemId",
                table: "Files",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Files_ItemId",
                table: "Files",
                column: "ItemId",
                unique: true,
                filter: "[ItemId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Files_Items_ItemId",
                table: "Files",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

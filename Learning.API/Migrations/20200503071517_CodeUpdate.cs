using Microsoft.EntityFrameworkCore.Migrations;

namespace Learning.API.Migrations
{
    public partial class CodeUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Codes_Courses_CourseId",
                table: "Codes");

            migrationBuilder.DropIndex(
                name: "IX_Codes_CourseId",
                table: "Codes");

            migrationBuilder.DropColumn(
                name: "CourseId",
                table: "Codes");

            migrationBuilder.AddColumn<int>(
                name: "CodeId",
                table: "Courses",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Courses_CodeId",
                table: "Courses",
                column: "CodeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_Codes_CodeId",
                table: "Courses",
                column: "CodeId",
                principalTable: "Codes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courses_Codes_CodeId",
                table: "Courses");

            migrationBuilder.DropIndex(
                name: "IX_Courses_CodeId",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "CodeId",
                table: "Courses");

            migrationBuilder.AddColumn<int>(
                name: "CourseId",
                table: "Codes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Codes_CourseId",
                table: "Codes",
                column: "CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Codes_Courses_CourseId",
                table: "Codes",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace Learning.API.Migrations
{
    public partial class CodeFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Codes_Courses_CourseID",
                table: "Codes");

            migrationBuilder.DropForeignKey(
                name: "FK_Codes_Courses_CourseIdID",
                table: "Codes");

            migrationBuilder.DropIndex(
                name: "IX_Codes_CourseIdID",
                table: "Codes");

            migrationBuilder.DropColumn(
                name: "CourseIdID",
                table: "Codes");

            migrationBuilder.RenameColumn(
                name: "CourseID",
                table: "Codes",
                newName: "CourseId");

            migrationBuilder.RenameIndex(
                name: "IX_Codes_CourseID",
                table: "Codes",
                newName: "IX_Codes_CourseId");

            migrationBuilder.AlterColumn<int>(
                name: "CourseId",
                table: "Codes",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Codes_Courses_CourseId",
                table: "Codes",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Codes_Courses_CourseId",
                table: "Codes");

            migrationBuilder.RenameColumn(
                name: "CourseId",
                table: "Codes",
                newName: "CourseID");

            migrationBuilder.RenameIndex(
                name: "IX_Codes_CourseId",
                table: "Codes",
                newName: "IX_Codes_CourseID");

            migrationBuilder.AlterColumn<int>(
                name: "CourseID",
                table: "Codes",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "CourseIdID",
                table: "Codes",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Codes_CourseIdID",
                table: "Codes",
                column: "CourseIdID");

            migrationBuilder.AddForeignKey(
                name: "FK_Codes_Courses_CourseID",
                table: "Codes",
                column: "CourseID",
                principalTable: "Courses",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Codes_Courses_CourseIdID",
                table: "Codes",
                column: "CourseIdID",
                principalTable: "Courses",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

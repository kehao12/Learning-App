using Microsoft.EntityFrameworkCore.Migrations;

namespace Learning.API.Migrations
{
    public partial class AddTableProcess1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProcessStudies_AspNetUsers_UserId",
                table: "ProcessStudies");

            migrationBuilder.DropIndex(
                name: "IX_ProcessStudies_UserId",
                table: "ProcessStudies");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "ProcessStudies",
                newName: "IdUserCourse");

            migrationBuilder.AddColumn<int>(
                name: "UserCourseId",
                table: "ProcessStudies",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProcessStudies_UserCourseId",
                table: "ProcessStudies",
                column: "UserCourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProcessStudies_UserCourses_UserCourseId",
                table: "ProcessStudies",
                column: "UserCourseId",
                principalTable: "UserCourses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProcessStudies_UserCourses_UserCourseId",
                table: "ProcessStudies");

            migrationBuilder.DropIndex(
                name: "IX_ProcessStudies_UserCourseId",
                table: "ProcessStudies");

            migrationBuilder.DropColumn(
                name: "UserCourseId",
                table: "ProcessStudies");

            migrationBuilder.RenameColumn(
                name: "IdUserCourse",
                table: "ProcessStudies",
                newName: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ProcessStudies_UserId",
                table: "ProcessStudies",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProcessStudies_AspNetUsers_UserId",
                table: "ProcessStudies",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

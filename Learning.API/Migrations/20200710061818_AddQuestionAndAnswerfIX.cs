using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Learning.API.Migrations
{
    public partial class AddQuestionAndAnswerfIX : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_Files_FileId",
                table: "Questions");

            migrationBuilder.RenameColumn(
                name: "FileId",
                table: "Questions",
                newName: "TestId");

            migrationBuilder.RenameIndex(
                name: "IX_Questions_FileId",
                table: "Questions",
                newName: "IX_Questions_TestId");

            migrationBuilder.CreateTable(
                name: "Tests",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Time = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    Point = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tests", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_Tests_TestId",
                table: "Questions",
                column: "TestId",
                principalTable: "Tests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_Tests_TestId",
                table: "Questions");

            migrationBuilder.DropTable(
                name: "Tests");

            migrationBuilder.RenameColumn(
                name: "TestId",
                table: "Questions",
                newName: "FileId");

            migrationBuilder.RenameIndex(
                name: "IX_Questions_TestId",
                table: "Questions",
                newName: "IX_Questions_FileId");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_Files_FileId",
                table: "Questions",
                column: "FileId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

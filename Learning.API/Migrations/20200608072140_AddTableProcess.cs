using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Learning.API.Migrations
{
    public partial class AddTableProcess : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Courses_CourseID",
                table: "Reviews");

            migrationBuilder.RenameColumn(
                name: "CourseID",
                table: "Reviews",
                newName: "CourseId");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_CourseID",
                table: "Reviews",
                newName: "IX_Reviews_CourseId");

            migrationBuilder.AlterColumn<int>(
                name: "CourseId",
                table: "Reviews",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "ProcessStudies",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(nullable: false),
                    ItemId = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false),
                    Finish = table.Column<int>(nullable: false),
                    Duration = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProcessStudies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProcessStudies_Items_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProcessStudies_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProcessStudies_ItemId",
                table: "ProcessStudies",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_ProcessStudies_UserId",
                table: "ProcessStudies",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Courses_CourseId",
                table: "Reviews",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Courses_CourseId",
                table: "Reviews");

            migrationBuilder.DropTable(
                name: "ProcessStudies");

            migrationBuilder.RenameColumn(
                name: "CourseId",
                table: "Reviews",
                newName: "CourseID");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_CourseId",
                table: "Reviews",
                newName: "IX_Reviews_CourseID");

            migrationBuilder.AlterColumn<int>(
                name: "CourseID",
                table: "Reviews",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Courses_CourseID",
                table: "Reviews",
                column: "CourseID",
                principalTable: "Courses",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

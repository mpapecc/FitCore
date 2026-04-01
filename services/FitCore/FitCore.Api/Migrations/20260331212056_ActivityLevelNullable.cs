using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitCore.Api.Migrations
{
    /// <inheritdoc />
    public partial class ActivityLevelNullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Members_ActivityLevels_ActivityLevelId",
                table: "Members");

            migrationBuilder.AlterColumn<Guid>(
                name: "ActivityLevelId",
                table: "Members",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddForeignKey(
                name: "FK_Members_ActivityLevels_ActivityLevelId",
                table: "Members",
                column: "ActivityLevelId",
                principalTable: "ActivityLevels",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Members_ActivityLevels_ActivityLevelId",
                table: "Members");

            migrationBuilder.AlterColumn<Guid>(
                name: "ActivityLevelId",
                table: "Members",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Members_ActivityLevels_ActivityLevelId",
                table: "Members",
                column: "ActivityLevelId",
                principalTable: "ActivityLevels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

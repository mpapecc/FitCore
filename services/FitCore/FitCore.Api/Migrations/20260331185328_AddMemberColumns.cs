using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitCore.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddMemberColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CurrentHeight",
                table: "Members",
                type: "integer",
                nullable: true,
                defaultValue: null);

            migrationBuilder.AddColumn<int>(
                name: "CurrentWeight",
                table: "Members",
                type: "integer",
                nullable: true,
                defaultValue: null);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CurrentHeight",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "CurrentWeight",
                table: "Members");
        }
    }
}

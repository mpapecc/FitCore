using System;
using FitCore.Api.Domain;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitCore.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddActivityLevelAndItsRealations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ActivityLevelId",
                table: "Members",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<bool>(
                name: "IsDefault",
                table: "FitnessGoals",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.Sql(@"
                UPDATE ""FitnessGoals""
                SET ""IsDefault"" = true
                WHERE ""Label"" = 'Lose Weight';
            ");

            migrationBuilder.CreateTable(
                name: "ActivityLevels",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    TenantId = table.Column<Guid>(type: "uuid", nullable: false),
                    Label = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    IsDefault = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityLevels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityLevels_Tenants_TenantId",
                        column: x => x.TenantId,
                        principalTable: "Tenants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "ActivityLevels",
                columns : new string[] { "Id", "CreatedOn", "UpdatedOn", "TenantId", "Label", "Description", "IsDefault" },
                values : new object[,]
                {
                    { Guid.CreateVersion7(), DateTime.UtcNow, DateTime.UtcNow, PrimordialTenantContants.Id, "Sedentary", "Little to no exercise", false },
                    { Guid.CreateVersion7(), DateTime.UtcNow, DateTime.UtcNow, PrimordialTenantContants.Id, "LightlyActive", "1-3 days/week", true },
                    { Guid.CreateVersion7(), DateTime.UtcNow, DateTime.UtcNow, PrimordialTenantContants.Id, "ModeratelyActive", "3-5 days/week", false },
                    { Guid.CreateVersion7(), DateTime.UtcNow, DateTime.UtcNow, PrimordialTenantContants.Id, "VeryActive", "6-7 days/week", false },
                    { Guid.CreateVersion7(), DateTime.UtcNow, DateTime.UtcNow, PrimordialTenantContants.Id, "ExtraActive", "physical job + exercise", false }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Members_ActivityLevelId",
                table: "Members",
                column: "ActivityLevelId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityLevels_TenantId",
                table: "ActivityLevels",
                column: "TenantId");

            migrationBuilder.AddForeignKey(
                name: "FK_Members_ActivityLevels_ActivityLevelId",
                table: "Members",
                column: "ActivityLevelId",
                principalTable: "ActivityLevels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Members_ActivityLevels_ActivityLevelId",
                table: "Members");

            migrationBuilder.DropTable(
                name: "ActivityLevels");

            migrationBuilder.DropIndex(
                name: "IX_Members_ActivityLevelId",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "ActivityLevelId",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "IsDefault",
                table: "FitnessGoals");
        }
    }
}

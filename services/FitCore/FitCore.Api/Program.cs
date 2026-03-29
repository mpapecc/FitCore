using FitCore.Api.Application;
using FitCore.Api.Infrastructure;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddApplication();
builder.Services.AddCors(options =>
{
    options.AddPolicy("FitCorePolicy", policy =>
        policy
            .WithOrigins(
                "http://localhost:5173",
                "https://localhost:5173",  // Vite web app
                "http://localhost:8081"// Expo mobile
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials());
});

var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}
app.UseCors("FitCorePolicy");
app.UseHttpsRedirection();
//app.UseAuthentication();   // ← added
app.UseAuthorization();
app.MapControllers();

app.Run();
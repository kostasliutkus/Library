using DataContext.LibraryDataContext;
using library_api.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


//Add database connection
builder.Services.AddDbContext<LibraryDataContext>(options =>
    options.UseInMemoryDatabase("LibraryDatabase"));
builder.Services.AddScoped<BookRepostiory>();
builder.Services.AddScoped<ReservationRepostiory>();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowReactApp",
            builder => builder.WithOrigins("http://localhost:3000") // React app URL
                              .AllowAnyMethod()
                              .AllowAnyHeader());
    });
var app = builder.Build();
//seed the database
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    SeedData.Initialize(services);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("AllowReactApp");

app.Run();

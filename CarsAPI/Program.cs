using System.Diagnostics;

// start db 
Process.Start("python", "cars_script.py")?.WaitForExit();


var builder = WebApplication.CreateBuilder(args);
 
 
builder.Services.AddControllers();

var allowedOrigins = builder.Configuration.GetValue<string>("allowedOrigins")!.Split(",");
 

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod();
    });
});
 
var app = builder.Build();
 
app.UseHttpsRedirection();
 
app.UseCors();
 
app.UseAuthorization();
 
app.MapControllers();
 
app.Run();
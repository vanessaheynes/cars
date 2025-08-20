using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;


[ApiController]
[Route("api/[controller]")]
public class CarsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetCars()
    {
        var cars = new List<Dictionary<string, object>>();

        using var connection = new SqliteConnection("Data Source=cars.db");
        connection.Open();

        var command = connection.CreateCommand();
        command.CommandText = "SELECT * FROM Cars";

        using var reader = command.ExecuteReader();
        while (reader.Read())
        {
            var row = new Dictionary<string, object>();
            for (int i = 0; i < reader.FieldCount; i++)
                row[reader.GetName(i)] = reader.GetValue(i);
            
            cars.Add(row);
        }

        return Ok(cars);
    }
}

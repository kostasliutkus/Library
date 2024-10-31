namespace Models;
using System.ComponentModel.DataAnnotations;
public class Book
{
    [Key]
    public int Id { get; set; } // Primary key
    public string? Name {get;set;}

    public string? Picture {get;set;}

    public int Year { get; set; }

    public ICollection<Reservation>? Reservations { get; set; }
}

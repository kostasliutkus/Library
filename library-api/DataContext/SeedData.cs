using DataContext.LibraryDataContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using Models;
public static class SeedData
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using (var context = new LibraryDataContext(
            serviceProvider.GetRequiredService<DbContextOptions<LibraryDataContext>>()))
        {

            context.Database.EnsureCreated();
            // Check if the database is already seeded
            if (context.Books.Any())
            {
                return; // DB has been seeded
            }

            
            var books = new List<Book>{
                new Book { Name = "Haris ir Poteris", Picture = "https://i.imgur.com/uhgk3l5.jpeg", Year = 2025 },
                new Book { Name = "Žolės pjovimas", Picture = "https://i.imgur.com/zmkp9yp.jpeg", Year = 2024 },
                new Book { Name = "Gyvulių ūkis", Picture = "https://i.imgur.com/JZdxmIG.jpeg", Year = 1945 }
            };
            context.Books.AddRange(books);
            
            context.SaveChanges();

            var reservations = new List<Reservation>
            {
                new Reservation { BookId = books[0].Id, BookType = "Audiobook",QuickPickUp = false,HowManyDays = 4,Price = Reservation.CalculatePrice(false,4,"Audiobook") },
                new Reservation { BookId = books[1].Id, BookType = "Book",QuickPickUp = false,HowManyDays = 4,Price = Reservation.CalculatePrice(false,4,"Book" )},
                new Reservation { BookId = books[2].Id, BookType = "Audiobook",QuickPickUp = false,HowManyDays = 4,Price = Reservation.CalculatePrice(false,4,"Audiobook") }
            };

            context.Reservations.AddRange(reservations);
            context.SaveChanges();
        }
    }
}
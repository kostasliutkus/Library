using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DataContext.LibraryDataContext
{
    public class LibraryDataContext : DbContext
    {
        public LibraryDataContext(DbContextOptions<LibraryDataContext> options)
            : base(options)
        { }

        public DbSet<Book> Books { get; set; }
        public DbSet<Reservation> Reservations { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Book>().HasKey(b => b.Id);
            builder.Entity<Reservation>().HasKey(r => r.Id);

            // Configure the one-to-many relationship
            builder.Entity<Reservation>()
            .HasOne(r => r.Book)
            .WithMany(b => b.Reservations)
            .HasForeignKey(r => r.BookId);
        }
    }
}
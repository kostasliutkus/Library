namespace Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class Reservation
{
    [Key]
    public int Id { get; set; } // Primary key
    public string BookType {get;set;}
    public bool QuickPickUp {get;set;}
    public int HowManyDays {get;set;}
    public int BookId { get; set; }
    public decimal Price {get;set;}
    public Book? Book { get; set; }

    public void CalculatePrice()
    {
        decimal ServiceFee = 3;
        if(BookType.Equals("Audiobook"))
        {
            Price = HowManyDays*3;
        }
        if(BookType.Equals("Book"))
        {
            Price = HowManyDays*2;
        }
        if(HowManyDays > 3 && HowManyDays <=10) 
        {
            Price = Price * (decimal)0.90;
        }
        if(HowManyDays > 10)
        {
            Price = Price * (decimal)0.80;
        }
        if(QuickPickUp == true)
        {
            Price += 5;
        }
        //ServiceFee
        Price += ServiceFee;
    }
    public static decimal CalculatePrice(bool quickPickUp,int howManyDays,string bookType)
    {
        decimal basePrice=0;
        decimal ServiceFee = 3;
        if(bookType.Equals("Audiobook"))
        {
            basePrice = howManyDays*3;
        }
        if(bookType.Equals("Book"))
        {
            basePrice = howManyDays*2;
        }
        if(howManyDays > 3 && howManyDays <=10) 
        {
            basePrice = basePrice * (decimal)0.90;
        }
        if(howManyDays > 10)
        {
            basePrice = basePrice * (decimal)0.80;
        }
        if(quickPickUp == true)
        {
            basePrice += 5;
        }
        //ServiceFee
        basePrice += ServiceFee;
        return basePrice;
    }
}

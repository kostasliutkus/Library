using Microsoft.EntityFrameworkCore;
using Models;
using DataContext.LibraryDataContext;

namespace library_api.Repositories;

public class BookRepostiory
{
    private readonly LibraryDataContext _dataContext;

    public BookRepostiory(LibraryDataContext dataContext)
    {
        _dataContext = dataContext;
    }
    public async Task<IEnumerable<Book>> GetBooksAsync()
    {
        return await _dataContext.Set<Book>().ToListAsync();
    }
    public async Task<Book> GetBookAsync(int id)
    {
        return await _dataContext.Set<Book>().FindAsync(id);
    }
}
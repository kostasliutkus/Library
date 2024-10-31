using Microsoft.EntityFrameworkCore;
using Models;
using DataContext.LibraryDataContext;

namespace library_api.Repositories;

public class ReservationRepostiory
{
    private readonly LibraryDataContext _dataContext;

    public ReservationRepostiory(LibraryDataContext dataContext)
    {
        _dataContext = dataContext;
    }
    
    public async Task<IEnumerable<Reservation>> GetReservationsAsync()
    {
        return await _dataContext.Set<Reservation>().ToListAsync();
    }

    public async Task<Reservation> GetReservationAsync(int id)
    {
        return await _dataContext.Set<Reservation>().FindAsync(id);
    }

    public async Task<Reservation> AddReservationAsync(Reservation reservation)
    {
        _dataContext.Set<Reservation>().Add(reservation);
        await _dataContext.SaveChangesAsync();
        return reservation;
    }
}
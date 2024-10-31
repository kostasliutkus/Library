using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataContext.LibraryDataContext;
using Models;
using library_api.Repositories;

namespace library_api.Controllers
{
    [Route("api/Reservations")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly ReservationRepostiory _reservationRepo;

        public ReservationController(ReservationRepostiory reservationRepo)
        {
            _reservationRepo = reservationRepo;
        }

        [HttpGet]
        public async Task<ActionResult> GetReservations()
        {
            var reservations = await _reservationRepo.GetReservationsAsync();
            if(reservations==null)
                return NoContent();
            return Ok(reservations);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Reservation>> GetReservation(int id)
        {
            var reservation = await _reservationRepo.GetReservationAsync(id);

            if (reservation == null)
            {
                return NotFound();
            }

            return reservation;
        }

        [HttpPost]
        public async Task<ActionResult<Reservation>> PostReservation(Reservation reserveRequest)
        {
             if (reserveRequest == null)
            {
                return BadRequest("Reservation Request cannot be null");
            }
            var reservationToAdd = new Reservation{
                BookType = reserveRequest.BookType,
                QuickPickUp = reserveRequest.QuickPickUp,
                HowManyDays = reserveRequest.HowManyDays,
                BookId =  reserveRequest.BookId
            };
            reservationToAdd.CalculatePrice();
            var result = await _reservationRepo.AddReservationAsync(reservationToAdd);

            return CreatedAtAction(nameof(GetReservation), new { id = result.Id }, result);
        }
    }
}

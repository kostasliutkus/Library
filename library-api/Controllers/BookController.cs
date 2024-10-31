using library_api.Repositories;
using Microsoft.AspNetCore.Mvc;
using Models;
namespace library_api.Controllers;

[ApiController]
[Route("api/Books")]
public class BookController : ControllerBase
{
    private readonly BookRepostiory _bookRepo;

    public BookController(BookRepostiory bookRepo)
    {
        _bookRepo = bookRepo;
    }

    [HttpGet]
    public async Task<IActionResult> GetBooks()
    {
        var renters = await _bookRepo.GetBooksAsync();

        if (renters == null)
            return StatusCode(500);
        return Ok(renters);
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetBook(int id)
    {
        var renters = await _bookRepo.GetBookAsync(id);
        if (renters == null)
            return StatusCode(500);
        return Ok(renters);
    }

}

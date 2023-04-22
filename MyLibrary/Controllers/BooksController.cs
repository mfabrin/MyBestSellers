using Microsoft.AspNetCore.Mvc;
using MyLibrary.Application.Services;

namespace MyLibrary.WebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class BooksController : ControllerBase
    {
        private readonly BookService _bookService;

        public BooksController(BookService bookService)
        {
            _bookService = bookService;
        }


        [HttpGet]
        public async Task<IActionResult> BookList(int pageNr, string category)
        {
            var response = await _bookService.GetBooks(pageNr, category);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> BookDetails(string isbn, int pageNr, string category)
        {
            var response = await _bookService.GetBook(isbn, pageNr, category);
            return Ok(response);
        }
    }
}
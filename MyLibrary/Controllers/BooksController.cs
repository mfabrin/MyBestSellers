using Microsoft.AspNetCore.Mvc;
using MyLibrary.Application.DTO.Book;
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
        public async Task<IActionResult> BookList(string? isbn, int pageNr, string category)
        {
            var response = await _bookService.GetBooks(isbn, pageNr, category);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> BookDetails(string isbn, int pageNr, string category)
        {
            var response = await _bookService.GetBook(isbn, pageNr, category);
            return Ok(response);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateFavourite(string isbn)
        {
            var response = await _bookService.SaveBookAsFavourite(isbn);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Save(BookSaveRequest request)
        {
            var response = await _bookService.SaveBook(request);
            return Ok(response);
        }
    }
}
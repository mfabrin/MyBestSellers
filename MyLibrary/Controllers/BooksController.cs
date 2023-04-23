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
        public async Task<IActionResult> BestSellers(string publishDate, string? category)
        {
            var response = string.IsNullOrWhiteSpace(category)
                ? await _bookService.GetBestSellersOverview(publishDate)
                : await _bookService.GetBestSellers(publishDate, category);

            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> MyLibrary(string? category, string? title)
        {
            var response = await _bookService.GetMyLibrary(category, title);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> Book(string isbn, string category, string publishDate)
        {
            var response = await _bookService.GetBook(isbn, category, publishDate);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateLibrary(MyLibraryUpdateRequest request)
        {
            var response = await _bookService.UpdateLibrary(request);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Update(BookSaveRequest request)
        {
            var response = await _bookService.UpdateBook(request);
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var response = await _bookService.DeleteBook(id);
            return Ok(response);
        }
    }
}
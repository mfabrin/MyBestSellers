using Microsoft.AspNetCore.Mvc;
using MyBestSellers.Application.DTO.Book;
using MyBestSellers.Application.Services;

namespace MyBestSellers.WebApp.Controllers
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
        public async Task<IActionResult> BestSellers(DateTime publishDate, string? category)
        {
            var response = string.IsNullOrWhiteSpace(category)
                ? await _bookService.GetBestSellersOverview(publishDate)
                : await _bookService.GetBestSellersByCategory(publishDate, category);

            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> MyBestSellers(string? category, string? title, string? author)
        {
            var response = await _bookService.GetMyBestSellers(category, title, author);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> Book(string isbn, string category, string publishDate)
        {
            var response = await _bookService.GetBook(isbn, category, publishDate);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Update(BookSaveRequest request)
        {
            var response = await _bookService.UpdateBook(request);
            return Ok(response);
        }
    }
}
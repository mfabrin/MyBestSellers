using MyLibrary.Application.DTO.Book;
using MyLibrary.Application.OperationResults;
using MyLibrary.Domain.AggregateRoots;
using MyLibrary.Domain.Interfaces;
using MyLibrary.Infrastructure.NYTimes;

namespace MyLibrary.Application.Services
{
    public class BookService
    {
        private readonly IRepository<Book> _repBooks;
        private readonly NYTimesManager _timesManager;

        public BookService(IRepository<Book> repBooks, NYTimesManager timesManager)
        {
            _repBooks = repBooks;
            _timesManager = timesManager;
        }


        public async Task<ItemListResponse<BooksResponse>> GetBooks(int pageNr, string category)
        {
            var timesResponse = await _timesManager.GetCategoryBooks(pageNr, "current", category);

            var isbns = timesResponse.results.books.Select(x => x.primary_isbn13).ToList();

            var myBooks = await _repBooks.Get(x => isbns.Contains(x.ISBN13));


            var response = timesResponse.results.books
                .Select(x => new BooksResponse
                {
                    ISBN = x.primary_isbn13,
                    Title = x.title,
                    Author = x.author,
                    Contributor = x.contributor,
                    Image = x.book_image,
                    Description = x.description
                }).ToList();

            return new ItemListResponse<BooksResponse>(response).WithCount(timesResponse.num_results);
        }

        public async Task<ItemResponse<BookResponse>> GetBook(string isbn, int pageNr, string category)
        {
            var timesResponse = await _timesManager.GetCategoryBooks(pageNr, "current", category);

            var timesBook = timesResponse.results.books.SingleOrDefault(x => x.primary_isbn13 == isbn);

            if (timesBook == null)
                throw new ArgumentException("Book not found");


            var myBook = await _repBooks.GetSingleOrDefaultAsync(x => x.ISBN13 == isbn);


            var response = new BookResponse
            {
                ISBN13 = timesBook.primary_isbn13,
                Title = timesBook.title,
                Author = timesBook.author,
                Image = timesBook.book_image,
                IsFavourite = myBook?.IsFavourite ?? false,
                IsRead = myBook?.IsRead ?? false,
                Notes = myBook?.Notes,
                Rank = myBook?.Rank.GetValueOrDefault() ?? 0
            };

            return new ItemResponse<BookResponse>(response);
        }
    }
}

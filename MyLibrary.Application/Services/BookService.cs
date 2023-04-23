using MyLibrary.Application.DTO.Book;
using MyLibrary.Application.OperationResults;
using MyLibrary.Common.Helpers;
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



        public async Task<ItemResponse<BestSellersResponse>> GetBestSellersOverview(string publishDate)
        {
            var timesResponse = await _timesManager.GetBestSellersOverview(publishDate);


            var response = new BestSellersResponse
            {
                Categories = timesResponse.results.lists.Select(x => x.list_name_encoded).Distinct().ToList(),
                BestSellers = timesResponse.results.lists
                    .Select(x => new BestSellersResponse.BestSeller
                    {
                        Category = x.list_name_encoded,
                        PublishDate = timesResponse.results.published_date,
                        Books = x.books
                            .Select(x => new BestSellersResponse.BestSeller.Book
                            {
                                ISBN = x.primary_isbn13,
                                Title = x.title,
                                Author = x.author,
                                Contributor = x.contributor,
                                Image = x.book_image,
                                Description = x.description
                            }).ToList()
                    }).ToList()
            };

            return new ItemResponse<BestSellersResponse>(response);
        }

        public async Task<ItemResponse<BestSellersResponse>> GetBestSellersByCategory(string publishDate, string category)
        {
            var timesResponse = await _timesManager.GetBestSellers(publishDate, category);

            var response = new BestSellersResponse
            {
                Categories = new List<string>() { category },
                BestSellers = new List<BestSellersResponse.BestSeller>()
                {
                    new BestSellersResponse.BestSeller
                    {
                        Category = category,
                        PublishDate = timesResponse.results.published_date,
                        Books = timesResponse.results.books
                            .Select(x => new BestSellersResponse.BestSeller.Book
                            {
                                ISBN = x.primary_isbn13,
                                Title = x.title,
                                Author = x.author,
                                Contributor = x.contributor,
                                Image = x.book_image,
                                Description = x.description
                            }).ToList()
                    }
                }
            };

            return new ItemResponse<BestSellersResponse>(response);
        }

        public async Task<ItemListResponse<MyLibraryResponse>> GetMyLibrary(string? category)
        {
            var predicate = PredicateBuilder.True<Book>();

            if (string.IsNullOrWhiteSpace(category) == false)
                predicate = predicate.And(x => x.Category == category);


            var myBooks = await _repBooks.Get(predicate);


            var response = myBooks
                .Select(x => new MyLibraryResponse
                {
                    ISBN = x.ISBN13,
                    Category = x.Category,
                    PublishDate = x.PublishDate,
                    Title = x.Title,
                    Author = x.Author,
                }).ToList();


            return new ItemListResponse<MyLibraryResponse>(response);
        }

        public async Task<ItemResponse<BookResponse>> GetBook(string isbn, string category, string publishDate)
        {
            var timesResponse = await _timesManager.GetBestSellers(publishDate, category);

            var timesBook = timesResponse.results.books.Single(x => x.primary_isbn13 == isbn);


            var book = await _repBooks.GetSingleOrDefaultAsync(x => x.ISBN13 == isbn && x.Category == category && x.PublishDate == publishDate);


            var response = new BookResponse
            {
                ISBN = isbn,
                Title = timesBook.title,
                Author = timesBook.author,
                Contributor = timesBook.contributor,
                Category = category,
                PublishDate = publishDate,
                Image = timesBook.book_image,
                Description = timesBook.description,
                IsFavourite = book?.IsFavourite,
                IsRead = book?.IsRead,
                Notes = book?.Notes,
                Rank = book?.Rank.GetValueOrDefault()
            };

            return new ItemResponse<BookResponse>(response);
        }

        public async Task<SaveResponse> UpdateBook(BookSaveRequest request)
        {
            var book = await _repBooks.GetSingleOrDefaultAsync(x => x.ISBN13 == request.ISBN && x.Category == request.Category && x.PublishDate == request.PublishDate);

            if (book == null)
            {
                book = new Book(
                    isbn13: request.ISBN,
                    category: request.Category,
                    publishDate: request.PublishDate,
                    title: request.Title,
                    author: request.Author,
                    image: request.Image
                );
            }

            book.Update(
                rank: request.Rank,
                isRead: request.IsRead,
                isFavourite: request.IsFavourite,
                notes: request.Notes
            );

            if (book.IsTransient())
                await _repBooks.InsertAsync(book);
            else
                await _repBooks.Update(book)
                    .Set(x => x.Rank, book.Rank)
                    .Set(x => x.IsRead, book.IsRead)
                    .Set(x => x.IsFavourite, book.IsFavourite)
                    .Set(x => x.Notes, book.Notes)
                    .DoUpdateAsync();

            return new SaveResponse(1);
        }
    }
}

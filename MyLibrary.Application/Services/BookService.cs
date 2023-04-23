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

            var isbns = timesResponse.results.lists
                .SelectMany(x => x.books)
                .Select(x => x.primary_isbn13)
                .ToList();

            var myBooks = await _repBooks.Get(x => isbns.Contains(x.ISBN13));


            var response = new BestSellersResponse
            {
                Categories = timesResponse.results.lists.Select(x => x.list_name_encoded).Distinct().ToList(),
                Books = new List<BestSellersResponse.Book>()
            };


            foreach (var category in timesResponse.results.lists)
            {
                foreach (var book in category.books)
                {
                    var res = new BestSellersResponse.Book
                    {
                        Category = category.list_name_encoded,
                        CategoryName = category.display_name,
                        PublishDate = category.updated,
                        ISBN = book.primary_isbn13,
                        Title = book.title,
                        Author = book.author,
                        Contributor = book.contributor,
                        Image = book.book_image,
                        Description = book.description,
                        IsFavourite = myBooks.SingleOrDefault(y => book.primary_isbn13 == y.ISBN13 && y.Category == category.list_name_encoded && y.PublishDate == publishDate)?.IsFavourite ?? false
                    };

                    response.Books.Add(res);
                }
            }

            return new ItemResponse<BestSellersResponse>(response);
        }

        public async Task<ItemResponse<BestSellersResponse>> GetBestSellers(string publishDate, string category)
        {
            var timesResponse = await _timesManager.GetBestSellers(publishDate, category);

            var isbns = timesResponse.results.books
                .Select(x => x.primary_isbn13)
                .ToList();

            var myBooks = await _repBooks.Get(x => isbns.Contains(x.ISBN13));


            var response = new BestSellersResponse
            {
                Categories = new List<string>() { category },
                Books = timesResponse.results.books
                    .Select(x => new BestSellersResponse.Book
                    {
                        Category = category,
                        CategoryName = timesResponse.results.display_name,
                        PublishDate = timesResponse.results.updated,
                        ISBN = x.primary_isbn13,
                        Title = x.title,
                        Author = x.author,
                        Contributor = x.contributor,
                        Image = x.book_image,
                        Description = x.description,
                        IsFavourite = myBooks.SingleOrDefault(y => x.primary_isbn13 == y.ISBN13)?.IsFavourite ?? false
                    }).ToList()
            };

            return new ItemResponse<BestSellersResponse>(response);
        }

        public async Task<ItemListResponse<MyLibraryResponse>> GetMyLibrary(string? category, string? title)
        {
            var predicate = PredicateBuilder.True<Book>();

            if (string.IsNullOrWhiteSpace(category) == false)
                predicate = predicate.And(x => x.Category == category);

            if (string.IsNullOrWhiteSpace(title) == false)
            {
                title = title.Trim().ToUpper();
                predicate = predicate.And(x => x.Title.ToUpper().Contains(title));
            }


            var myBooks = await _repBooks.Get(predicate);

            var response = myBooks
                .Select(x => new MyLibraryResponse
                {
                    ISBN = x.ISBN13,
                    Author = x.Author,
                    Category = x.Category,
                    PublishDate = x.PublishDate,
                    Contributor = x.Contributor,
                    Description = x.Description,
                    Image = x.Image,
                    IsFavourite = x.IsFavourite,
                    Title = x.Title
                }).ToList();

            return new ItemListResponse<MyLibraryResponse>(response);
        }

        public async Task<ItemResponse<BookResponse>> GetBook(string isbn, string category, string publishDate)
        {
            var book = await _repBooks.GetSingleOrDefaultAsync(x => x.ISBN13 == isbn && x.Category == category && x.PublishDate == publishDate);

            if (book == null)
            {
                var timesResponse = await _timesManager.GetBestSellers(publishDate, category);

                var timesBook = timesResponse.results.books.Single(x => x.primary_isbn13 == isbn);

                book = new Book(
                    isbn13: timesBook.primary_isbn13,
                    category: category,
                    publishDate: publishDate,
                    image: timesBook.book_image,
                    author: timesBook.author,
                    contributor: timesBook.contributor,
                    title: timesBook.title,
                    description: timesBook.description
                );
            }


            var response = new BookResponse
            {
                ISBN = book.ISBN13,
                Title = book.Title,
                Author = book.Author,
                Contributor = book.Contributor,
                Category = book.Category,
                PublishDate = book.PublishDate,
                Image = book.Image,
                Description = book.Description,
                IsFavourite = book.IsFavourite,
                IsRead = book.IsRead,
                Notes = book.Notes,
                Rank = book.Rank.GetValueOrDefault()
            };

            return new ItemResponse<BookResponse>(response);
        }

        public async Task<SaveResponse> UpdateLibrary(MyLibraryUpdateRequest request)
        {
            var book = await _repBooks.GetSingleOrDefaultAsync(x => x.ISBN13 == request.ISBN && x.Category == request.Category && x.PublishDate == request.PublishDate);

            if (book == null)
            {
                var timesResponse = await _timesManager.GetBestSellers(request.PublishDate, request.Category);

                var timesBook = timesResponse.results.books.Single(x => x.primary_isbn13 == request.ISBN);

                book = new Book(
                    isbn13: timesBook.primary_isbn13,
                    category: request.Category,
                    publishDate: request.PublishDate,
                    image: timesBook.book_image,
                    author: timesBook.author,
                    contributor: timesBook.contributor,
                    title: timesBook.title,
                    description: timesBook.description
                );
            }


            if (book.IsFavourite == true)
                book.SetAsNoFavourite();
            else
                book.SetAsFavourite();


            if (book.IsTransient())
                await _repBooks.InsertAsync(book);
            else
                await _repBooks.Update(book)
                    .Set(x => x.IsFavourite, book.IsFavourite)
                    .DoUpdateAsync();

            return new SaveResponse(1);
        }

        public async Task<SaveResponse> UpdateBook(BookSaveRequest request)
        {
            var book = await _repBooks.GetSingleOrDefaultAsync(x => x.ISBN13 == request.ISBN && x.Category == request.Category && x.PublishDate == request.PublishDate);

            if (book == null)
            {
                var timesResponse = await _timesManager.GetBestSellers(request.PublishDate, request.Category);

                var timesBook = timesResponse.results.books.Single(x => x.primary_isbn13 == request.ISBN);

                book = new Book(
                    isbn13: timesBook.primary_isbn13,
                    category: request.Category,
                    publishDate: request.PublishDate,
                    image: timesBook.book_image,
                    author: timesBook.author,
                    contributor: timesBook.contributor,
                    title: timesBook.title,
                    description: timesBook.description
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

        public async Task<DeleteResponse> DeleteBook(Guid id)
        {
            var book = await _repBooks.GetSingleOrDefaultAsync(x => x.Id == id);

            if (book == null)
                throw new ArgumentException("Book not found");

            await _repBooks.Delete(book);

            return new DeleteResponse(true);
        }
    }
}

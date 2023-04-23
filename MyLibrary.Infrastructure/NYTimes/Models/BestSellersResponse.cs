using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyLibrary.Infrastructure.NYTimes.Models
{
    public class BestSellersResponse
    {
        public List<Category> Categories { get; set; }


        public class Category
        {
            public string CategoryKey { get; set; }
            public string PublishDate { get; set; }
            public List<Book> Books { get; set; }


            public class Book
            {
                public string ISBN { get; set; }
                public string Image { get; set; }
                public string Title { get; set; }
                public string Author { get; set; }
                public string Contributor { get; set; }
                public string Description { get; set; }
                public bool IsFavourite { get; set; }
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyLibrary.Application.DTO.Book
{
    public class BookResponse
    {
        public string ISBN { get; set; }
        public string Image { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public string PublishDate { get; set; }
        public string Author { get; set; }
        public string Contributor { get; set; }
        public string Description { get; set; }
        public string Notes { get; set; }
        public int Rank { get; set; }
        public bool IsFavourite { get; set; }
        public bool IsRead { get; set; }
    }
}

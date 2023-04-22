using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyLibrary.Application.DTO.Book
{
    public class BookResponse
    {
        public string ISBN13 { get; set; }
        public string Image { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Notes { get; set; }
        public int Rank { get; set; }
        public bool IsFavourite { get; set; }
        public bool IsRead { get; set; }
    }
}

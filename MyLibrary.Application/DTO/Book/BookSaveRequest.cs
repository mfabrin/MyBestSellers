using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyLibrary.Application.DTO.Book
{
    public class BookSaveRequest
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "ISBN is mandatory field")]
        public string ISBN { get; set; }
        public int? Rank { get; set; }
        public bool IsRead { get; set; }
        public bool IsFavourite { get; set; }
        public string Notes { get; set; }
    }
}

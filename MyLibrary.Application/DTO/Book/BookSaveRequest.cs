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

        [Required(AllowEmptyStrings = false, ErrorMessage = "Category is mandatory field")]
        public string Category { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "PublishDate is mandatory field")]
        public string PublishDate { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Author is mandatory field")]
        public string Author { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Title is mandatory field")]
        public string Title { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Image is mandatory field")]
        public string Image { get; set; }

        public int? Rank { get; set; }
        public bool IsRead { get; set; }
        public bool IsFavourite { get; set; }
        public string Notes { get; set; }
    }
}

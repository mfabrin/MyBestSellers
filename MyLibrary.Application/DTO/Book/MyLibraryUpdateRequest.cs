using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyLibrary.Application.DTO.Book
{
    public class MyLibraryUpdateRequest
    {
        public string ISBN { get; set; }
        public string Category { get; set; }
        public string PublishDate { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyLibrary.Common.Exceptions
{
    internal class ErrorResponse
    {
        public bool HasErrors { get; set; }
        public List<string> Errors { get; set; }


        public ErrorResponse(List<string> messages)
        {
            HasErrors = true;
            Errors = messages;
        }
    }
}

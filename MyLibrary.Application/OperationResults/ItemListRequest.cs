using System;
using System.Collections.Generic;
using System.Text;

namespace MyLibrary.Application.OperationResults
{
    public abstract class ItemListRequest
    {
        public int PageNr { get; set; }
        public int PageSize { get; set; }
    }
}

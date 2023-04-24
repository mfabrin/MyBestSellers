using System;
using System.Collections.Generic;
using System.Text;

namespace MyBestSellers.Application.OperationResults
{
    public abstract class BaseResponse
    {
        public bool HasErrors { get; set; }
        public List<string> Errors { get; set; }
    }
}

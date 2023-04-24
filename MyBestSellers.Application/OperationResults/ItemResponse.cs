using System;
using System.Collections.Generic;
using System.Text;

namespace MyBestSellers.Application.OperationResults
{
    public class ItemResponse<T> : BaseResponse
    {
        public T Item { get; set; }
        public int ETag { get; set; }
        
        
        public ItemResponse(T item)
        {
            Item = item;
        }

        public ItemResponse<T> WithError(string error)
        {
            Errors = Errors ?? new List<string>();
            Errors.Add(error);
            HasErrors = true;

            return this;
        }

        public ItemResponse<T> WithErrors(List<string> errors)
        {
            Errors = Errors ?? new List<string>();
            Errors.AddRange(errors);
            HasErrors = true;

            return this;
        }
    }
}

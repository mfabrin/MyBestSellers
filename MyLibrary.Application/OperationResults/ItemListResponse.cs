using System.Collections.Generic;

namespace MyLibrary.Application.OperationResults
{
    public class ItemListResponse<T> : BaseResponse
    {
        public List<T> Items { get; set; }
        public long RecordCount { get; set; }


        public ItemListResponse(List<T> items)
        {
            Items = items;
        }


        public ItemListResponse<T> WithError(string error)
        {
            Errors = Errors ?? new List<string>();
            Errors.Add(error);
            HasErrors = true;

            return this;
        }

        public ItemListResponse<T> WithErrors(List<string> errors)
        {
            Errors = Errors ?? new List<string>();
            Errors.AddRange(errors);
            HasErrors = true;

            return this;
        }

        public ItemListResponse<T> WithCount(long count)
        {
            RecordCount = count;
            return this;
        }
    }
}

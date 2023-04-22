using System;
using System.Collections.Generic;

namespace MyLibrary.Application.OperationResults
{
    public class SaveResponse : BaseResponse
    {
        public Guid Id { get; set; }
        public int AffectedRecords { get; set; }


        public SaveResponse(int affectedRecords)
        {
            AffectedRecords = affectedRecords;
        }

        public SaveResponse WithId(Guid id)
        {
            Id = id;
            return this;
        }

        public SaveResponse WithError(string error)
        {
            Errors = Errors ?? new List<string>();
            Errors.Add(error);
            HasErrors = true;

            return this;
        }

        public SaveResponse WithErrors(List<string> errors)
        {
            Errors = Errors ?? new List<string>();
            Errors.AddRange(errors);
            HasErrors = true;

            return this;
        }
    }
}

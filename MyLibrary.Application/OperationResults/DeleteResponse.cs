using System;
using System.Collections.Generic;
using System.Text;

namespace MyLibrary.Application.OperationResults
{
    public class DeleteResponse : BaseResponse
    {
        public bool HasDeleted { get; set; }


        public DeleteResponse(bool hasDeleted)
        {
            HasDeleted = hasDeleted;
            Errors = new List<string>();
        }

        public DeleteResponse WithError(string message)
        {
            HasDeleted = false;
            Errors.Add(message);
            HasErrors = true;

            return this;
        }

        public DeleteResponse WithErrors(List<string> messages)
        {
            HasDeleted = false;
            Errors = messages;
            HasErrors = true;

            return this;
        }
    }
}

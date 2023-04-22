using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyLibrary.Domain.ValueObjects
{
    public class AuditInfo
    {
        public string CreatedBy { get; private set; }
        public DateTime CreatedOn { get; private set; }
        public string LastUpdatedBy { get; private set; }
        public DateTime LastUpdatedOn { get; private set; }


        public AuditInfo(string currentUser)
        {
            CreatedBy = currentUser;
            CreatedOn = DateTime.Now;
            LastUpdatedBy = currentUser;
            LastUpdatedOn = DateTime.Now;
        }

        public void Update(string currentUser)
        {
            LastUpdatedBy = currentUser;
            LastUpdatedOn = DateTime.Now;
        }
    }
}

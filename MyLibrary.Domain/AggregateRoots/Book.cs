using MyLibrary.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyLibrary.Domain.AggregateRoots
{
    public class Book : AggregateRoot
    {
        public string ISBN13 { get; private set; }
        public string UserName { get; private set; }
        public int? Rank { get; private set; }
        public bool IsRead { get; private set; }
        public bool IsFavourite { get; private set; }
        public string Notes { get; private set; }


        public Book(string isbn13, string username)
        {
            ISBN13 = isbn13;
            UserName = username;
            AuditInfo = new AuditInfo(username);
        }

        public void SetAsFavourite()
        {
            IsFavourite = true;
        }

        public void Update(int? rank, bool isRead, bool isFavourite, string notes, string currentUser)
        {
            Rank = rank;
            IsRead = isRead;
            IsFavourite = isFavourite;
            Notes = notes;
            AuditInfo.Update(currentUser);
        }
    }
}

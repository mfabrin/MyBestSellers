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
        public int? Rank { get; private set; }
        public bool IsRead { get; private set; }
        public bool IsFavourite { get; private set; }
        public string Notes { get; private set; }


        public Book(string isbn13)
        {
            ISBN13 = isbn13;
        }

        public void SetAsFavourite()
        {
            IsFavourite = true;
        }

        public void SetAsNoFavourite()
        {
            IsFavourite = false;
        }

        public void Update(int? rank, bool isRead, bool isFavourite, string notes)
        {
            Rank = rank;
            IsRead = isRead;
            IsFavourite = isFavourite;
            Notes = notes;
        }
    }
}

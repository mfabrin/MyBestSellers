﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyBestSellers.Domain.AggregateRoots
{
    public class Book : AggregateRoot
    {
        public string ISBN13 { get; private set; }
        public string Category { get; private set; }
        public string PublishDate { get; private set; }
        public string Title { get; private set; }
        public string Author { get; private set; }
        public string Image { get; private set; }
        public int? Rank { get; private set; }
        public bool IsRead { get; private set; }
        public bool IsFavourite { get; private set; }
        public string Notes { get; private set; }
        public DateTime CreatedOn { get; private set; }
        public DateTime LastUpdatedOn { get; private set; }


        public Book(
            string isbn13,
            string category,
            string publishDate,
            string title,
            string author,
            string image)
        {
            ISBN13 = isbn13;
            Category = category;
            PublishDate = publishDate;
            Title = title;
            Author = author;
            Image = image;
            CreatedOn = DateTime.Now;
        }

        public void SetAsFavourite()
        {
            IsFavourite = true;
            LastUpdatedOn = DateTime.Now;
        }

        public void SetAsNoFavourite()
        {
            IsFavourite = false;
            LastUpdatedOn = DateTime.Now;
        }

        public void Update(int? rank, bool isRead, bool isFavourite, string notes)
        {
            Rank = rank;
            IsRead = isRead;
            IsFavourite = isFavourite;
            Notes = notes;
            LastUpdatedOn = DateTime.Now;
        }
    }
}

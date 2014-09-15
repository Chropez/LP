using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LP.Models
{
    public class GalleryItem
    {
        public int Id { get; set; }
        public DateTime? AddedDateTime { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Owner { get; set; }
        public string Url { get; set; }
    }
}
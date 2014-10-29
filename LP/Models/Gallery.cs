using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LP.Models
{
    public class Gallery
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Owner { get; set; } //@Todo change to a userObject
        public bool IsPublished { get; set; }
        public DateTime? CreatedDate { get; set; }
        public virtual IList<GalleryItem> GalleryItems { get; set; }
    }
}
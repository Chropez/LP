using LP.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace LP.Repository
{
    public class LPContext : DbContext
    {

        public DbSet<Gallery> Galleries { get; set; }
        public DbSet<GalleryItem> GalleryItems { get; set; }
    }
}
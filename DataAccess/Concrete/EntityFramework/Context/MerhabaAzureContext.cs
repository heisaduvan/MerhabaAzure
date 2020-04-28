using Core.Entities.Concrete;
using Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Concrete.EntityFramework.Context
{
    public class MerhabaAzureContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=tcp:merhabaazuredbserver.database.windows.net,1433;Initial Catalog=merhabaazuredb;User ID=isaduvan;Password=1283Mka00;Trusted_Connection=False;Encrypt=True;");
        }

        public DbSet<AppUser> AppUser { get; set; }
        public DbSet<Message> Message { get; set; }

        public DbSet<OperationClaim> OperationClaims { get; set; }
        public DbSet<UserOperationClaim> UserOperationClaims { get; set; }
    }
}

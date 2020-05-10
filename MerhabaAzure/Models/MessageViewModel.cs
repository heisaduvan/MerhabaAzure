using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MerhabaAzure.Models
{
    public class MessageViewModel
    {
        public Message message { get; set; }
        public string senderUserEmail { get; set; }
        public string receiverUserEmail { get; set; }

    }
}

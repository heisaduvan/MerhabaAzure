using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Concrete
{
    public class Message :IEntity
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string MessageContent { get; set; }
        public DateTime SendDate { get; set; }
        public string HubConnectionId { get; set; }
        public bool MessageReceive { get; set; }
    }
}

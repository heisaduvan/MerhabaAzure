using Castle.DynamicProxy.Generators;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Concrete
{
    public class Message :IEntity
    {
        public int Id { get; set; }
        public int SenderUserId { get; set; }
        public int ReceiverUserId { get; set; }
        public string MessageContent { get; set; }
        public DateTime SendDate { get; set; }
        public bool MessageReceive { get; set; }
        public string SenderUserName { get; set; }
        public string SenderUserEmail { get; set; }

    }
}

using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IMessageService
    {
        IEnumerable<Message> GetMessages(int receiverId);
        void Add(Message message);
        IEnumerable<Message> GetMessagesForClient(int receiverId, int senderId);
    }
}

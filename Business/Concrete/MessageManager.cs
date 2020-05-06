using Business.Abstract;
using DataAccess.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class MessageManager : IMessageService
    {
        IMessageDal messageDal;
        public MessageManager(IMessageDal messageDal)
        {
            this.messageDal = messageDal;
        }
        public void Add(Message message)
        {
            messageDal.Add(message);
        }

        public IEnumerable<Message> GetMessages(int receiverId)
        {
            return messageDal.GetList(m => m.ReceiverUserId == receiverId);
        }


        public IEnumerable<Message> GetMessagesForClient(int receiverId, int senderId)
        {
            return messageDal.GetList(m => 
            (m.ReceiverUserId == receiverId && m.SenderUserId == senderId) || (m.ReceiverUserId == senderId && m.SenderUserId == receiverId)
            );
        }
    }
}

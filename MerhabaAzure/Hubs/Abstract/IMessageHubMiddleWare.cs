using Entities.Concrete;
using MerhabaAzure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MerhabaAzure.Hubs.Abstract
{
    public interface IMessageHubMiddleWare
    {
        Task NewMessageAsync(Message message);
        Task NewMessageToClientAsync(Message message,string senderUserConnectionId, string receiverUserConnectionId);
    }
}

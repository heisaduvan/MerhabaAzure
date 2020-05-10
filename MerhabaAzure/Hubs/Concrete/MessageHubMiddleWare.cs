using Entities.Concrete;
using MerhabaAzure.Hubs.Abstract;
using Microsoft.AspNetCore.SignalR;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MerhabaAzure.Hubs.Concrete
{
    public class MessageHubMiddleWare : IMessageHubMiddleWare
    {
        public readonly IHubContext<MessageHub> hubContext;
        public MessageHubMiddleWare(IHubContext<MessageHub> hubContext)
        {
            this.hubContext = hubContext;
        }
        public async Task NewMessageAsync(Message message)
        {
           await this.hubContext.Clients.All.SendAsync("MessageReceived",message);
        }

        public async Task NewMessageToClientAsync(Message message,string senderUserConnectionId, string receiverUserConnectionId)
        {
            await this.hubContext.Clients.Clients(senderUserConnectionId, receiverUserConnectionId).SendAsync("MessageReceived", message);
        }
    }
}

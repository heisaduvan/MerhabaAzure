using Business.Abstract;
using Core.Entities.Concrete;
using Entities.Concrete;
using MerhabaAzure.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using MoreLinq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace MerhabaAzure.Hubs
{
    public class MessageHub : Hub
    {

        IMessageService messageManager;
        IUserService userManager;
        public MessageHub(IMessageService messageManager, IUserService userManager)
        {
            this.messageManager = messageManager;
            this.userManager = userManager;
        }
        private static List<SignalRUser> userList = new List<SignalRUser>();
        public async Task NewMessage(Message msg)
        {
            msg.ReceiverUserId = 0;
            msg.SendDate = DateTime.Now;
            await Clients.All.SendAsync("MessageReceived", msg);
            
            messageManager.Add(msg);
        }
        public async Task NewMessageToClient(Message msg,string clientEmail)
        {
            string clientId = userList.Where(u => u.email == clientEmail).Select(u => u.hubConnectionId).FirstOrDefault();
            msg.ReceiverUserId = userManager.GetByMail(clientEmail).Id;
            msg.SendDate = DateTime.Now;
            await Clients.Clients(clientId).SendAsync("MessageReceived", msg);
            await Clients.Caller.SendAsync("MessageReceived", msg);
            messageManager.Add(msg);
        }
        public async Task GetAllMessages()
        {
            List<Message> messageList = messageManager.GetMessages(0).ToList();
            await Clients.Caller.SendAsync("GetAllMessages", messageList);
        }
        public async Task GetAllMessagesForClient(int senderId, string clientEmail)
        {
            int receiverId = userManager.GetByMail(clientEmail).Id;
            List<Message> messageList = messageManager.GetMessagesForClient(receiverId,senderId).ToList();
            await Clients.Caller.SendAsync("GetAllMessages", messageList);
        }
        public  async Task OnConnected(SignalRUser user)
        {
            
            SignalRUser checkUser = userList.Where(u => u.email == user.email).FirstOrDefault();

            if (checkUser == null && user.email != null && user.username != null)
            {
                user.userId = userManager.GetByMail(user.email).Id;
                user.hubConnectionId = Context.ConnectionId;
                userList.Add(user);
            }
            if (checkUser != null)
            {
                checkUser.hubConnectionId = Context.ConnectionId;
            }
            userList = userList.DistinctBy(x=>x.email).ToList();
            await Clients.All.SendAsync("NewOnlineUser", userList);
        }
        public async Task OnDisconnected(SignalRUser user)
        {
            SignalRUser checkUser = userList.Where(u => u.email == user.email ).FirstOrDefault();
            if(checkUser != null && user.email!=null && user.username!=null)
            {
                userList.Remove(checkUser);
            }
            await Clients.All.SendAsync("NewOnlineUser", userList);
        }
    }
}

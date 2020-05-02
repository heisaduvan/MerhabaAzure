using Core.Entities.Concrete;
using Entities.Concrete;
using MerhabaAzure.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MerhabaAzure.Hubs
{
    public class MessageHub : Hub
    {
        private static List<Message> messageList = new List<Message>();
        private static List<SignalRUser> userList = new List<SignalRUser>();
        public async Task NewMessage(Message msg)
        {
            messageList.Add(msg);
            await Clients.All.SendAsync("MessageReceived", msg);
        }
        public async Task GetAllMessage()
        {
            await Clients.All.SendAsync("GetAllMessage", messageList);
        }
        public async Task OnConnected(SignalRUser user)
        {
            SignalRUser checkUser = userList.Where(u =>u.email == user.email).FirstOrDefault();
            if(checkUser == null)
            {
                userList.Add(user);
            }
            await Clients.All.SendAsync("NewOnlineUser", userList);
        }
        public async Task OnDisconnected(SignalRUser user)
        {
            SignalRUser checkUser = userList.Where(u => u.email == user.email ).FirstOrDefault();
            if(checkUser != null)
            {
                userList.Remove(checkUser);
            }
            await Clients.All.SendAsync("NewOnlineUser", userList);
        }
    }
}

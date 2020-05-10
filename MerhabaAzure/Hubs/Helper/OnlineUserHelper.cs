using MerhabaAzure.Models;
using MoreLinq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MerhabaAzure.Hubs.Helper
{
    public class OnlineUserHelper
    {
        private static List<SignalRUser> OnlineUsers { get; set; } = new List<SignalRUser>();

        public void AddNewUser(SignalRUser user, string hubConnectionId)
        {
            SignalRUser checkUser = OnlineUsers.Where(u => u.email == user.email).FirstOrDefault();
            if (checkUser == null && user.email != null && user.username != null)
            {
                user.hubConnectionId = hubConnectionId;
                OnlineUsers.Add(user);
            }
            if (checkUser != null)
            {
                checkUser.hubConnectionId = hubConnectionId;
            }
            OnlineUsers = OnlineUsers.DistinctBy(x => x.email).ToList();
        }
        public List<SignalRUser> GetOnlineUsers()
        {
            return OnlineUsers;
        }
    }
}

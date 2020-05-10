using Business.Abstract;
using MerhabaAzure.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Mvc;
using MerhabaAzure.Hubs.Abstract;
using System.Threading.Tasks;
using Entities.Concrete;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using MerhabaAzure.Models;
using MerhabaAzure.Hubs.Helper;
using System.Linq;
using System;

namespace MerhabaAzure.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MessageHubController : ControllerBase
    {
        private readonly IMessageService messageManager;
        private readonly IUserService userManager;
        private readonly IMessageHubMiddleWare messageHub;
        private OnlineUserHelper helper;
        public MessageHubController(IMessageService messageManager, IUserService userManager, IMessageHubMiddleWare messageHub,OnlineUserHelper helper)
        {
            this.helper = helper; 
            this.messageHub = messageHub;
            this.messageManager = messageManager;
            this.userManager = userManager;
        }
        [HttpPost("NewMessage")]
        public async Task<ActionResult> NewMessageAsync(MessageViewModel model)
        {
            var userList = helper.GetOnlineUsers();
            var senderUser = userManager.GetByMail(model.senderUserEmail);
            if (senderUser != null)
            {
                model.message.SenderUserId = senderUser.Id;
                model.message.ReceiverUserId = 0;
                model.message.SendDate = DateTime.Now;
                await this.messageHub.NewMessageAsync(model.message);
                messageManager.Add(model.message);
                return Ok();
            }
            return StatusCode(500);
        }
        [HttpPost("NewMessageToClient")]
        public async Task<ActionResult> NewMessageToClientAsync(MessageViewModel model)
        {
            var userList = helper.GetOnlineUsers();
            var receiverUser = userList.Where(u => u.email == model.receiverUserEmail).FirstOrDefault();
            var senderUser = userList.Where(u => u.email == model.senderUserEmail).FirstOrDefault();
            if (receiverUser != null && senderUser !=null)
            {
                model.message.SenderUserId = userManager.GetByMail(model.senderUserEmail).Id;
                model.message.ReceiverUserId = userManager.GetByMail(model.receiverUserEmail).Id;
                model.message.SendDate = DateTime.Now;
                await this.messageHub.NewMessageToClientAsync(model.message, senderUser.hubConnectionId, receiverUser.hubConnectionId);
                messageManager.Add(model.message);
                return Ok();
            }

            return StatusCode(500);
        }
        public async Task<ActionResult> GetEveryoneMessages()
        {
            return null;
        }
        public async Task<ActionResult> GetClientMessages()
        {
            return null;
        }

    }
}
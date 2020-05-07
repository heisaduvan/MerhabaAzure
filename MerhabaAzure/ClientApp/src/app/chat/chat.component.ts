import { Component, OnInit, NgZone } from "@angular/core";

import { Message } from "../_models/Message";
import { ChatService } from "src/app/_service/chat.service";
import { AuthenticationService } from "src/app/_service/authentication.service";
import { User } from "../_models/User";
@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
  providers: [ChatService],
})
export class ChatComponent implements OnInit {
  private loadingImage = require("src/assets/messageloading.svg");
  txtMessage: string = "";
  MessagesArray = new Array<Message>();
  message = new Message();
  OnlineUsers = new Array<User>();
  selectedUser: User;
  everyOne: User = {
    username: "Everyone",
    firstName: "",
    lastName: "",
    userId: 0,
    password: "",
    role: "",
    token: "",
    hubConnectionId: "",
    email: "",
  };
  myUserId: number;

  constructor(
    private chatService: ChatService,
    private _ngZone: NgZone,
    private authenticationService: AuthenticationService
  ) {
    this.subscribeToEvents();
  }
  checkMessageOwner(message) {
    var currentUserEmail = this.authenticationService.getCurrentUserEmail();
    message.MessageReceive = true;
    if (message.SenderUserEmail === currentUserEmail) {
      message.MessageReceive = false;
    }
    return message;
  }

  sendMessage(): void {
    if (this.txtMessage) {
      this.message = new Message();
      this.message.SenderUserName = this.authenticationService.getCurrentUserName();
      this.message.SenderUserEmail = this.authenticationService.getCurrentUserEmail();
      this.message.SenderUserId = this.myUserId;
      this.message.ReceiverUserEmail = this.selectedUser.email;
      this.message.MessageContent = this.txtMessage;
      this.message.MessageReceive = false;

      if (this.selectedUser === this.everyOne) {
        this.chatService.sendMessage(this.message);
      } else {
        this.chatService.sendMessageToClient(
          this.message,
          this.selectedUser.email
        );
      }
      this.txtMessage = "";
    }
  }
  private subscribeToEvents(): void {
    this.chatService.oldMessagesArray.subscribe((messages: Array<Message>) => {
      this._ngZone.run(() => {
        var currentUserEmail = this.authenticationService.getCurrentUserEmail();
        messages.forEach(function (message) {
          message.MessageReceive = true;
          if (message.SenderUserEmail === currentUserEmail) {
            message.MessageReceive = false;
          }
        });
        this.MessagesArray = messages;
      });
    });

    this.chatService.messageReceived.subscribe((message: Message) => {
      this._ngZone.run(() => {
        message = this.checkMessageOwner(message);
        message.SendDate = new Date(
          message.SendDate.toLocaleString("tr-TR", {
            timeZone: "Turkey/Istanbul",
          })
        );
        if (message.MessageReceive) {
          if (this.selectedUser === this.everyOne) {
            if (message.ReceiverUserId === 0) {
              this.MessagesArray.push(message);
            }
          } else {
            if (
              message.SenderUserEmail === this.selectedUser.email &&
              message.ReceiverUserId === this.myUserId
            ) {
              this.MessagesArray.push(message);
            }
          }
        } else {
          this.MessagesArray.push(message);
        }
      });
    });

    this.chatService.OnlineUsers.subscribe((data) => {
      this._ngZone.run(() => {
        this.OnlineUsers = data.filter(
          (u) => u.email != this.authenticationService.getCurrentUserEmail()
        );

        data.filter((u) => {
          if (u.email === this.authenticationService.getCurrentUserEmail()) {
            this.myUserId = u.userId;
            localStorage.setItem("myUserId", "this.myUserId");
          }
        });
      });
    });
  }
  ngOnInit() {
    this.selectedUser = this.everyOne;
  }
  selectUser(user: User = this.everyOne) {
    if (this.selectedUser !== user) {
      this.selectedUser = user;
      if (this.selectedUser === this.everyOne) {
        this.chatService.getAllMessage();
      } else {
        this.chatService.getAllMessageForClient(
          this.myUserId,
          this.selectedUser.email
        );
      }
      this.MessagesArray = new Array<Message>();
    }
  }
}

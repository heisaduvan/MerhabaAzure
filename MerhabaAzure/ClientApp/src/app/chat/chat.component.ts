import { Component, OnInit, NgZone } from "@angular/core";

import { Message } from "../_models/Message";
import { ChatService } from "src/app/_service/chat.service";
import { AuthenticationService } from "src/app/_service/authentication.service";
import { User } from "../_models/User";
@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
})
export class ChatComponent implements OnInit {
  title = "ClientApp";
  txtMessage: string = "";
  MessagesArray = new Array<Message>();
  message = new Message();
  OnlineUsers = new Array<User>();
  connectionId: any;
  constructor(
    private chatService: ChatService,
    private _ngZone: NgZone,
    private authenticationService: AuthenticationService
  ) {
    this.subscribeToEvents();

  }
  checkMessageOwner(message) {
    message.MessageReceive = true;
    if (message.UserName === this.authenticationService.getCurrentUserName()) {
      message.MessageReceive = false;
    }
    return message;
  }
  sendMessage(): void {
    if (this.txtMessage) {
      this.message = new Message();
      this.message.UserName = this.authenticationService.getCurrentUserName();
      this.message.MessageContent = this.txtMessage;
      this.message.SendDate = new Date();
      this.message.MessageReceive = false;
      this.chatService.sendMessage(this.message);
      this.txtMessage = "";
    }
  }
  private subscribeToEvents(): void {

    this.chatService.oldMessagesArray.subscribe((messages: Array<Message>) => {
      this._ngZone.run(() => {
        var username = this.authenticationService.getCurrentUserName();
        messages.forEach(function (message) {
          message.MessageReceive = true;
          if (message.UserName === username) {
            message.MessageReceive = false;
          }
        });
        this.MessagesArray = messages;
      });
    });

    this.chatService.messageReceived.subscribe((message: Message) => {
      this._ngZone.run(() => {
        message = this.checkMessageOwner(message);
        this.MessagesArray.push(message);

      });
    });

    this.chatService.OnlineUsers.subscribe((data) => {
      this._ngZone.run(() => {
        this.OnlineUsers = data;
      })
    });
  }
  kapat() {
    //this.chatService.closeConnection();
    console.log(this.OnlineUsers);

  }
  ngOnInit() {
  }
  
  
}

import { Injectable, Inject, EventEmitter } from "@angular/core";
import {
  HubConnection,
  HubConnectionBuilder,
  JsonHubProtocol,
} from "@aspnet/signalr";
import { Message } from "src/app/_models/Message";
import { User } from "src/app/_models/User";
import { AuthenticationService } from "src/app/_service/authentication.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class ChatService {
  messageReceived = new EventEmitter<Message>();
  connectionEstablished = new EventEmitter<Boolean>();
  oldMessagesArray = new EventEmitter<Message>();
  oldMessagesArrayForClient = new EventEmitter<Message>();

  OnlineUsers = new EventEmitter<User>();

  private _hubConnection: HubConnection;

  constructor(
    private authenticationService: AuthenticationService,
    private httpClient: HttpClient
  ) {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }
  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl("/MessageHub")
      .build();
  }
  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        console.log("Hub connection started");
        this.connectionEstablished.emit(true);
        this.getAllMessage();
        this.OnlineUser();
      })
      .catch((err) => {
        console.log("Error while establishing connection, retrying...");
        setTimeout(function () {
          this.startConnection();
        }, 5000);
      });
  }
  private registerOnServerEvents(): void {
    this._hubConnection.on("NewOnlineUser", (data: any) => {
      this.OnlineUsers.emit(data);
    });
    this._hubConnection.on("MessageReceived", (data: any) => {
      this.messageReceived.emit(data);
    });
    this._hubConnection.on("GetAllMessages", (data: any) => {
      this.oldMessagesArray.emit(data);
    });
  }
  public closeConnection(_username: string, _email: string): void {
    // var user = { username: _username, email: _email };
    // this._hubConnection.invoke("OnDisconnected", user);
    // this._hubConnection.stop();
  }
  getAllMessage() {
    // this._hubConnection.invoke("GetAllMessages");
  }
  getAllMessageForClient(senderId: number, clientEmail: string) {
    // this._hubConnection.invoke(
    //   "GetAllMessagesForClient",
    //   senderId,
    //   clientEmail
    // );
  }
  OnlineUser() {
    var user = {
      username: this.authenticationService.getCurrentUserName(),
      email: this.authenticationService.getCurrentUserEmail(),
    };
    this._hubConnection.invoke("OnConnectedAsync", user);
  }

  sendMessage(outgoingMessage: Message) {
    var data = {
      message: outgoingMessage,
      senderUserEmail: this.authenticationService.getCurrentUserEmail(),
      receiverUserEmail: "",
    };
    this.httpClient
      .post<Message>("https://localhost:44300/api/messagehub/NewMessage", data)
      .subscribe();
  }
  sendMessageToClient(outgoingMessage: Message, receiverUserEmail: string) {
    var data = {
      message: outgoingMessage,
      senderUserEmail: this.authenticationService.getCurrentUserEmail(),
      receiverUserEmail: receiverUserEmail,
    };
    const senderUserEmail: string = this.authenticationService.getCurrentUserEmail();
    this.httpClient
      .post<Message>(
        "https://localhost:44300/api/messagehub/NewMessageToClient",
        data
      )
      .subscribe();
  }
}

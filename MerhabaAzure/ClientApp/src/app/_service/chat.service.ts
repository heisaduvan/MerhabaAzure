import { Injectable, Inject, EventEmitter } from "@angular/core";
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
import { Message } from "src/app/_models/Message";
import { User } from "src/app/_models/User";
import { AuthenticationService } from "src/app/_service/authentication.service";
@Injectable({
  providedIn: "root",
})
export class ChatService {
  messageReceived = new EventEmitter<Message>();
  connectionEstablished = new EventEmitter<Boolean>();
  oldMessagesArray = new EventEmitter<Message>();
  OnlineUsers = new EventEmitter<User>();

  private connectionIsEstablished = false;
  private _hubConnection: HubConnection;
  private baseUrl: string;
  private connectionId: any;

  constructor(
    @Inject("BASE_URL") baseUrl: string,
    private authenticationService: AuthenticationService
  ) {
    this.baseUrl = baseUrl;
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
        this.connectionIsEstablished = true;
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
    this._hubConnection.on("MessageReceived", (data: any) => {
      this.messageReceived.emit(data);
    });
    this._hubConnection.on("GetAllMessage", (data: any) => {
      this.oldMessagesArray.emit(data);
    });
    this._hubConnection.on("NewOnlineUser", (data: any) => {
      this.OnlineUsers.emit(data);
    });
  }
  public closeConnection(): void {
    var user = { username: this.authenticationService.getCurrentUserName(), email: this.authenticationService.getCurrentUserEmail() }
    debugger;
    this._hubConnection.invoke("OnDisconnected", user);
    this._hubConnection.stop();
  }
  getAllMessage() {
    this._hubConnection.invoke("GetAllMessage");
  }
  OnlineUser() {
    var user = { username: this.authenticationService.getCurrentUserName(), email: this.authenticationService.getCurrentUserEmail() }
    this._hubConnection.invoke("OnConnected", user);
  }
  sendMessage(message: Message) {
    
    this._hubConnection.invoke("NewMessage", message);
  }
}

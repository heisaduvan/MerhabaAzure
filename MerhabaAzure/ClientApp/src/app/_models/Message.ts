export class Message {
  Id: number;
  SenderUserName: string;
  SenderUserEmail: string;
  SenderUserId: number;
  ReceiverUserEmail: string;
  ReceiverUserId: number;
  MessageContent: string;
  SendDate: Date;
  MessageReceive: boolean;
}

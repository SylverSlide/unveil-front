import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = '';
  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.listenForMessages();
    this.chatService.fetchMessages(1).subscribe((messages) => {
      this.messages = messages;
      console.log(messages);
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.chatService.sendMessage(this.newMessage).subscribe(() => {
        this.newMessage = '';
      });
    }
  }

  private listenForMessages(): void {
    this.chatService.listenForMessages().subscribe((chat) => {
      console.log(chat);
      this.messages.push(chat.message);
    });
  }
}

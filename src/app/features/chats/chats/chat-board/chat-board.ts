import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatItem } from '../chat-item/chat-item';

@Component({
    selector: 'app-chat-board',
    imports: [FormsModule, ChatItem],
    templateUrl: './chat-board.html',
    styleUrl: './chat-board.scss'
})
export class ChatBoard {
    selectedRoom: string = '';
    messages: any[] = [];
    newMessage: string = '';

    constructor() {
        //import chatMessageService
    }

    /* send message */
    onSubmit() {
        if (this.newMessage.trim().length) return;

        //this.chatMessageService.sendMessage(this.newMessage);
        this.newMessage = '';
    }
}

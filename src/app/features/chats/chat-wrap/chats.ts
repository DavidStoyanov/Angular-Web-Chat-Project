import { Component } from '@angular/core';

import { RoomBoard } from '../rooms/room-board/room-board';
import { ChatBoard } from '../chats/chat-board/chat-board';

@Component({
    selector: 'app-chats',
    imports: [RoomBoard, ChatBoard],
    templateUrl: './chats.html',
    styleUrl: './chats.scss',
})
export class Chats {
    constructor() {
        
    }
}

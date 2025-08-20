import { ChatRoomService } from './../../../../core/services/chat-room/chat-room-service';
import { Component, OnInit } from '@angular/core';

import { RoomItem } from '../room-item/room-item';
import { ChatRoomDto as ChatRoom } from '../../../../core/services';

@Component({
    selector: 'app-room-board',
    imports: [RoomItem],
    templateUrl: './room-board.html',
    styleUrl: './room-board.scss'
})
export class RoomBoard implements OnInit {
    selectedRoom: string = '';
    rooms: ChatRoom[] = [];

    constructor(
        private chatRoomService: ChatRoomService
    ) {

    }

    selectRoom(id: string) {
        
    }

    ngOnInit(): void {
        this.chatRoomService.getAllRooms().subscribe((data: ChatRoom[]) => {
            this.rooms = data;
        });
    }
}

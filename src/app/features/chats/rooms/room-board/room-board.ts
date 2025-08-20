import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { RoomItem } from '../room-item/room-item';
import { ChatRoomService, ChatRoomDto as ChatRoom } from '../../../../core/services';

@Component({
    selector: 'app-room-board',
    imports: [RoomItem],
    templateUrl: './room-board.html',
    styleUrl: './room-board.scss'
})
export class RoomBoard implements OnInit {
    @Output() roomSelected = new EventEmitter<string>();

    selectedRoom: string = '';
    rooms: ChatRoom[] = [];

    constructor(
        private chatRoomService: ChatRoomService
    ) {

    }

    selectRoom(id: string) {
        this.selectedRoom = id;
        this.roomSelected.emit(id);
    }

    ngOnInit(): void {
        this.chatRoomService.getAllRooms().subscribe((data: ChatRoom[]) => {
            this.rooms = data;
        });
    }
}

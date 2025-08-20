import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { RoomItem } from '../room-item/room-item';
import { RoomCreate } from '../room-create/room-create';
import { ChatRoomService, ChatRoomDto as ChatRoom, ChatRoomCreateDto, AuthService } from '../../../../core/services';

@Component({
    selector: 'app-room-board',
    imports: [RoomItem, RoomCreate],
    templateUrl: './room-board.html',
    styleUrl: './room-board.scss'
})
export class RoomBoard implements OnInit {
    @Output() roomSelected = new EventEmitter<string>();

    protected readonly getUser;
    protected readonly loggedIn;

    selectedRoom: string = '';
    rooms: ChatRoom[] = [];

    constructor(
        private chatRoomService: ChatRoomService,
        private authService: AuthService
    ) {
        this.getUser = authService.currentUser;
        this.loggedIn = authService.isLoggedIn;
    }

    onRoomCreated(roomTitle: string) {
        const roomCreateDto: ChatRoomCreateDto = {
            title: roomTitle,
            creator: this.getUser()!.id,
        };

        this.chatRoomService.createRoom(roomCreateDto)
            .subscribe((data: ChatRoom) => this.rooms.unshift(data));
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

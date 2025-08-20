import { Component, Input } from '@angular/core';

import { ChatRoomDto as ChatRoom } from '../../../../core/services';

@Component({
    selector: 'app-room-item',
    imports: [],
    templateUrl: './room-item.html',
    styleUrl: './room-item.scss'
})
export class RoomItem {
    @Input("roomItem") room!: ChatRoom;
}

import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChatRoomService, ChatRoomDto, ChatRoomUpdateDto, AuthService } from '../../core/services';

@Component({
    selector: 'app-my-chats',
    imports: [CommonModule, FormsModule],
    templateUrl: './my-chats.html',
    styleUrl: './my-chats.scss'
})
export class MyChats implements OnInit{
    private chatRoomService = inject(ChatRoomService)
    private authService = inject(AuthService);

    protected readonly getUser = this.authService.currentUser;

    rooms!: ChatRoomDto[];

    updateRoomTitle(id: string, newTitle: string) {
        const updateDto: ChatRoomUpdateDto = {
            title: newTitle,
            disable: false
        };
        
        this.chatRoomService.updateRoom(id, updateDto)
            .subscribe(data => console.log(data))
    }

    removeRoom(id: string, newTitle: string) {
        const updateDto: ChatRoomUpdateDto = {
            title: newTitle,
            disable: true
        };


        this.chatRoomService.updateRoom(id, updateDto)
            .subscribe((data: ChatRoomDto) => {
                console.log(data);
                const chatId = data.id;
                const index = this.rooms.findIndex(r => r.id === chatId);
                if (index !== -1) {
                    this.rooms.splice(index, 1);
                }
            });
    }

    ngOnInit(): void {
        this.chatRoomService.getAllRoomsForUser(this.getUser()?.id as number)
            .subscribe(data => this.rooms = data);
        /* this.chatRoomService.getAllRooms()
            .subscribe(data => this.rooms = data); */
    }
}

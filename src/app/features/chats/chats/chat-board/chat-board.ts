import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs';

import {
    ChatMessageDto as MessageDto,
    ChatMessageCreateDto,
    ChatMessageService,
    AuthService,
    ChatRoomService
} from '../../../../core/services';
import { ChatItem } from '../chat-item/chat-item';

@Component({
    selector: 'app-chat-board',
    imports: [FormsModule, ChatItem],
    templateUrl: './chat-board.html',
    styleUrl: './chat-board.scss'
})
export class ChatBoard implements OnInit, OnDestroy {
    @Input() selectedRoom!: string;

    protected readonly isLoggedIn;
    protected readonly getUser;

    roomName!: string;
    messages: MessageDto[] = [];
    newMessage: string = '';

    constructor(
        private chatMessageService: ChatMessageService,
        private chatRoomService: ChatRoomService,
        private authService: AuthService,
    ) {
        this.isLoggedIn = this.authService.isLoggedIn;
        this.getUser = this.authService.currentUser;
    }

    /* send message */
    onSubmit() {
        if (this.newMessage.trim().length === 0) return;

        const messageDto: ChatMessageCreateDto = {
            sender: this.getUser()!.id,
            content: this.newMessage,
            conversationId: this.selectedRoom,
        };

        this.chatMessageService.createMessage(messageDto)
            .subscribe((data: MessageDto) => {
                console.log(data)
                this.messages.push(data)
            });
        this.newMessage = '';
    }
    
    ngOnInit(): void {
        this.chatMessageService.getAllMessagesForRoom(this.selectedRoom).subscribe((data: MessageDto[]) => {
            this.messages = data;
        });

        this.chatRoomService.getRoom(this.selectedRoom)
            .pipe(map(roomDto => roomDto.title))
            .subscribe(title => this.roomName = title);

            
    }
    
    ngOnDestroy(): void {
        
    }
}

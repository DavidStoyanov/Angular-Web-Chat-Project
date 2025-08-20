import { Component, inject, Input } from '@angular/core';

import { AuthService, ChatMessageDto as MessageDto} from '../../../../core/services';

@Component({
    selector: 'app-chat-item',
    imports: [],
    templateUrl: './chat-item.html',
    styleUrl: './chat-item.scss'
})
export class ChatItem {
    @Input("msgItem") msg!: MessageDto;
    
    private authService = inject(AuthService);
    
    protected readonly isLoggedIn = this.authService.isLoggedIn;
    protected readonly getUser = this.authService.currentUser;
}

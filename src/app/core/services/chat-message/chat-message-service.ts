import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ResponseDto } from '../../../models';
import { ChatMessageCreateDto, ChatMessageDto } from './chat-message-model';

@Injectable({
    providedIn: 'root',
})
export class ChatMessageService {
    private apiUrl = 'http://localhost:8080/messages';
    
    constructor(private httpClient: HttpClient) {}

    getMessage(id: string): Observable<ChatMessageDto> {
        return this.httpClient.get<ResponseDto<ChatMessageDto>>(`${this.apiUrl}/${id}`)
                        .pipe(map(message => message.data as ChatMessageDto));
    }
    
    getAllMessages(): Observable<ChatMessageDto[]> {
        return this.httpClient.get<ResponseDto<ChatMessageDto[]>>(this.apiUrl)
                        .pipe(map(message => message.data as ChatMessageDto[]));
    }

    //todo: remove this and request with filter
    getAllMessagesForRoom(id: string): Observable<ChatMessageDto[]> {
        return this.httpClient.get<ResponseDto<ChatMessageDto[]>>(`${this.apiUrl}/${id}/room-specific`)
                        .pipe(map(message => message.data as ChatMessageDto[]));
    }

    createMessage(createDto: ChatMessageCreateDto): Observable<ChatMessageDto> {
        return this.httpClient.post<ResponseDto<ChatMessageDto>>(this.apiUrl, createDto)
                        .pipe(map(message => message.data as ChatMessageDto));
    }
}

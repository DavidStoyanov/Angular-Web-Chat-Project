import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ResponseDto } from '../../../models';
import { ChatRoomDto, ChatRoomCreateDto, ChatRoomUpdateDto } from './chat-room-model';

@Injectable({
    providedIn: 'root'
})
export class ChatRoomService {
    private apiUrl = 'http://localhost:8080/chats';

    constructor(private httpClient: HttpClient) {}

    getRoom(id: string): Observable<ChatRoomDto> {
        return this.httpClient.get<ResponseDto<ChatRoomDto>>(`${this.apiUrl}/${id}`)
                        .pipe(map(room => room.data as ChatRoomDto));
    }

    getAllRooms(): Observable<ChatRoomDto[]> {
        return this.httpClient.get<ResponseDto<ChatRoomDto[]>>(this.apiUrl)
                        .pipe(map(room => room.data as ChatRoomDto[]));
    }

    createRoom(createDto: ChatRoomCreateDto): Observable<ChatRoomDto> {
        return this.httpClient.post<ResponseDto<ChatRoomDto>>(this.apiUrl, createDto)
                        .pipe(map(room => room.data as ChatRoomDto));
    }

    updateRoom(id: string, updateDto: ChatRoomUpdateDto): Observable<ChatRoomDto> {
        return this.httpClient.patch<ResponseDto<ChatRoomDto>>(`${this.apiUrl}/${id}`, updateDto)
                        .pipe(map(room => room.data as ChatRoomDto));
    }
}

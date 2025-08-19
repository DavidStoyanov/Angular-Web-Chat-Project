import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { UserProfileDto } from '../../../features';
import { ResponseDto } from '../../../models';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:8080/users';

    constructor(private httpClient: HttpClient) {}

    getUserProfile(id: number): Observable<UserProfileDto> {
        return this.httpClient.get<ResponseDto<UserProfileDto>>(`${this.apiUrl}/${id}/profile`)
                        .pipe(map(user => user.data as UserProfileDto));
    }

    updateUserProfile(id: number, profileDto: UserProfileDto): Observable<ResponseDto<UserProfileDto>> {
        console.log([id, profileDto])
        return this.httpClient.put<ResponseDto<UserProfileDto>>(`${this.apiUrl}/${id}/profile`, profileDto, {
            withCredentials: true
        });
    }
}

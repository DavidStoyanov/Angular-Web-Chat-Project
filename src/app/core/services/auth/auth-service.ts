import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { UserDto as User, UserRegisterDto } from '../../../features/';
import { ApiUser } from './api-user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/users'
    private _isLoggedIn = signal<boolean>(false);
    private _currentUser = signal<User | null>(null);

    public isLoggedIn = this._isLoggedIn.asReadonly();
    public currentUser = this._currentUser.asReadonly();

    constructor(private httpClient: HttpClient) {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            const user: User = JSON.parse(savedUser);
            this.setLoggedUser(user);
        }
    }

    private mapApiUserToUser(apiUser: ApiUser): User {
        return <User> {
            id: apiUser.id,
            username: apiUser.username,
            email: apiUser.email,
        };
    }

    login(email: string, password: string): Observable<User> {
        return this.httpClient.post<ApiUser>(`${this.apiUrl}/login`, { email, password }, {
            withCredentials: true
        }).pipe(
            map(apiUser => this.mapApiUserToUser(apiUser)),
            tap(user => this.setSession(user))
        );
    }

    register(registerDto: UserRegisterDto): Observable<User> {
        return this.httpClient.post<ApiUser>(`${this.apiUrl}/register`, registerDto, {
            withCredentials: true
        }).pipe(
            map(apiUser => this.mapApiUserToUser(apiUser)),
            tap(user => this.setSession(user))
        );
    }

    logout(): Observable<void> {
        return this.httpClient.post<void>(`${this.apiUrl}/logout`, {}, {
            withCredentials: true
        }).pipe(
            tap(() => this.invalidateSession())
        );
    }

    get currentUserId(): string | null {
        return this._currentUser()?.id || null;
    }

    private setLoggedUser(user: User): void {
        this._currentUser.set(user);
        this._isLoggedIn.set(true);
    }

    private setSession(user: User): void {
        this.setLoggedUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    private invalidateSession(): void {
        this._currentUser.set(null);
        this._isLoggedIn.set(false);
        localStorage.removeItem('currentUser');
    }
}

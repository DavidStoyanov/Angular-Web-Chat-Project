import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { ResponseDto, UserDto as User, UserRegisterDto } from '../../../features/';

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

    

    login(email: string, password: string): Observable<ResponseDto> {
        return this.httpClient.post<ResponseDto>(`${this.apiUrl}/login`, { email, password }, {
            withCredentials: true
        }).pipe(
            tap(response => {
                if (response.success && response.data) {
                    const user = response.data as User;
                    this.setSession(user);
                }
            }),
            catchError(error => {
                console.error('Login error:', error);
                return of({
                    success: false,
                    data: null,
                    message: 'Server error. Please try again later.'
                } as unknown as ResponseDto);
            })
        );
    }

    register(registerDto: UserRegisterDto): Observable<ResponseDto> {
        return this.httpClient.post<ResponseDto>(`${this.apiUrl}/register`, registerDto, {
            withCredentials: true
        }).pipe(
            tap(response => {
                console.log(response)
                if (response.success && response.data) {
                    const user = response.data as User;
                    this.setSession(user);
                }
            }),
            catchError(error => {
                console.error('Register error:', error);
                return of({
                    success: false,
                    data: null,
                    message: 'Server error. Please try again later.'
                } as unknown as ResponseDto);
            })
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

export interface UserRegisterDto {
    username: string;
    email: string;
    password: string;
}

export class UserDto {
    id!: number;
    username!: string;
    password?: string;
    email!: string;
}
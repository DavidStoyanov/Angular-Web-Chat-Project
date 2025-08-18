export interface UserRegisterDto {
    username: string;
    email: string;
    password: string;
}

export class UserDto {
    id!: string;
    username!: string;
    password?: string;
    email!: string;
}
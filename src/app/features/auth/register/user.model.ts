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

export class ResponseDto {
    success!: boolean;
    message!: string;
    data?: UserDto;
    errors?: {};
}
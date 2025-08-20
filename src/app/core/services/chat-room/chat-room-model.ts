export interface ChatRoomDto {
    id: string;
    title: string;
    participantsSize: number;
}

export interface ChatRoomCreateDto {
    title: string;
    creator: string;
}

export interface ChatRoomUpdateDto {
    title: string;
    disable: boolean;
}
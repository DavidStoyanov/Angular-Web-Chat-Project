export interface ChatMessageDto {
    id: number;
    senderUsername: string;
    content: string;
    createdOn: string;
}

export interface ChatMessageCreateDto {
    sender: number;
    content: string;
    conversationId: string;
}
import { IsNumber } from "class-validator"
import { Chat } from "src/chat/entities/chat.entity"
import { User } from "src/user/entities/user.entity"

export class CreateLikeDto {

    @IsNumber()
    userId: number

    user: User

    @IsNumber()
    chatId: number

    chat: Chat
}

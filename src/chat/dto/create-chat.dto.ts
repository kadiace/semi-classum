import { IsNumber, IsString } from "class-validator";
import { Post } from "src/post/entities/post.entity";
import { User } from "src/user/entities/user.entity";

export class CreateChatDto {
    @IsString()
    text: string

    @IsNumber()
    commenterId: number

    commenter: User

    @IsNumber()
    postId: number

    post: Post
}

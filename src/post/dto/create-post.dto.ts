import { IsBoolean, IsNumber, IsString } from "class-validator";
import { Space } from "src/space/entities/space.entity";
import { User } from "src/user/entities/user.entity";

export class CreatePostDto {
    @IsString()
    text: string

    @IsBoolean()
    isnotify: boolean

    @IsNumber()
    uploaderId: number

    uploader: User

    @IsNumber()
    spaceId: number

    space: Space

}

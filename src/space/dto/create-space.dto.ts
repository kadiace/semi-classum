import { IsString } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateSpaceDto {
    @IsString()
    title: string;

    @IsString()
    admin: User;
}

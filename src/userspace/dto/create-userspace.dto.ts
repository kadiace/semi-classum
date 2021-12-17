import { IsNumber } from "class-validator";
import { Space } from "src/space/entities/space.entity";
import { User } from "src/user/entities/user.entity";

export class CreateUserspaceDto {
    @IsNumber()
    user: User

    @IsNumber()
    space: Space
}

import { IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    username: string;

    @IsString()
    password: string;
    
    @IsString()
    email: string;

    @IsString()
    lastname: string;

    @IsString()
    firstname: string;

    @IsOptional()
    profile: string;
}

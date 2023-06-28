import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SignInDto {
    @ApiProperty({
        required: true,
        type: String,
        example: 'username',
    })
    @IsString()
    public userName: string;

    @ApiProperty({
        required: true,
        type: String,
        example: 'password',
    })
    @IsString()
    public password: string;
}
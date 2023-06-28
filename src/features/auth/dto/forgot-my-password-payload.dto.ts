import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class ForgotMyPasswordDto {
    @ApiProperty({
        required: true,
        type: String,
        example: 'Daniela',
    })
    @IsString()
    public name: string;
    
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
        example: 'user@email.com',
    })
    @IsEmail()
    public email:string;

    @ApiProperty({
        required: true,
        type: String,
        example: 'new-password',
    })
    @IsString()
    public newPassword: string;
}
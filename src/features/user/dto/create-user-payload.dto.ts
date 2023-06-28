import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Role } from "src/core/enums";

export class CreateUserPayloadDto {
    @ApiProperty({
        required: true,
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    public userName: string;

    @ApiProperty({
        required: true,
        type: String,
        example: 'Daniela',
    })
    @IsString()
    @IsNotEmpty()
    public name: string;

    @ApiProperty({
        required: true,
        type: Number,
        example: 34,
    })
    @IsNumber()
    @IsNotEmpty()
    public age: number;

    @ApiProperty({
        required: true,
        enum: Role,
        example: Role.USER,
    })
    @IsEnum(Role)
    @IsNotEmpty()
    public role: Role;

    @ApiProperty({
        required: true,
        type: String,
        example: "password-string"
    })
    @IsString()
    public password: string;

    @ApiProperty({
        required: true,
        type: String,
        example: 'user@email.com',
    })
    @IsEmail()
    public email: string;

    @ApiProperty({
        required: true,
        type: Number,
        example: 3,
    })
    @IsNumber()
    public maxClassesPerWeek: number;
}
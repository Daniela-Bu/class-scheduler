import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { Role } from "../../../core/enums";
import { VerificationQuestion } from "src/core/enums/verification-question.enum";

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
        enum: Role,
        example: [Role.ADMIN, Role.USER],
    })
    @IsEnum(Role, { each: true })
    @IsNotEmpty()
    public roles: Role[];

    @ApiProperty({
        required: true,
        type: String,
        example: "password"
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

export class VerificationQuestionDto {
    @ApiProperty({
        required: true,
        enum: VerificationQuestion,
        example: VerificationQuestion.PET,
    })
    @IsEnum(VerificationQuestion)
    public question: VerificationQuestion;

    @ApiProperty({
        required: true,
        type: String,
        example: 'Type your answer here',
    })
    @IsString()
    public answer: string;
}
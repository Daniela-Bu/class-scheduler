import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { ClassType } from "src/core/enums/class-type.enum";

export class FindTutorsClassesDto {
    @ApiProperty({
        required: true,
        type: String,
        example: 'Daniela Bublil',
    })
    @IsString()
    public tutor: string;

    @ApiProperty({
        required: false,
        enum: ClassType,
        example: ClassType.YOGA,
    })
    @IsEnum(ClassType)
    @IsOptional()
    public className: ClassType;
}
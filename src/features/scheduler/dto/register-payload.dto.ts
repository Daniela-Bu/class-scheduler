import { ApiProperty } from "@nestjs/swagger";
import { ClassType } from "src/core/enums/class-type.enum";

export class RegisterDto {
    @ApiProperty({
        required: true,
        enum: ClassType,
        example: ClassType.SALSA,
    })
    public className: ClassType;
    
    @ApiProperty({
        required: false,
        type: Number,
        example: 8,
        minimum: 5,
        maximum: 10,
        default: 8,
    })
    public maxParticipants: number;
}
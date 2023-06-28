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
        required: true,
        type: Number,
        example: 6,
    })
    public maxParticipants: number;
}
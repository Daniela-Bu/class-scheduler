import { ApiProperty } from "@nestjs/swagger";
import { ClassType } from "src/core/enums/class-type.enum";

export class deleteClassPayloadDto {
    @ApiProperty({
        required: true,
        enum: ClassType,
        example: ClassType.PILATES,
    })
    public className: ClassType;
}
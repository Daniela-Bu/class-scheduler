import { ApiProperty } from "@nestjs/swagger";
import { ValidateNested } from "class-validator";
import { ClassType } from "src/core/enums/class-type.enum";
import { ClassTimePayloadDto } from "./class-time-payload.dto";

export class AddClassDto {
    @ApiProperty({
        required: true,
        enum: ClassType,
        example: ClassType.SALSA,
    })
    public className: ClassType;

    @ApiProperty({
        required: true,
        example: [{
            date: new Date(),
            duration: 1,
        }]
    })
    @ValidateNested()
    public time: [ClassTimePayloadDto];
}
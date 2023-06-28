import { ApiProperty } from "@nestjs/swagger";
import { Day, days } from "src/core/enums/days";
import { ClassType } from "src/core/enums/class-type.enum";

export class SignForClassDto {
    @ApiProperty({
        required: true,
        enum: ClassType,
        example: ClassType.PILATES,
    })
    public name: ClassType;

    @ApiProperty({
        required: true,
        type: String,
        example: 'Daniela'
    })
    public tutor: String;

    @ApiProperty({
        required: true,
        type: String,
        example: days[1],
    })
    public day: Day;

    @ApiProperty({
        required: true,
        type: Number,
        example: 15,
    })
    public hour: number;
}
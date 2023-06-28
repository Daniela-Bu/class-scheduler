import { ApiProperty } from "@nestjs/swagger";
import { Day, days } from "src/core/enums/days";

export class ClassTimeDto {
    @ApiProperty({
        required: true,
        type: String,
        example: days[1],
    })
    public day: Day;
    
    @ApiProperty({
        required: true,
        type: Number,
        example: 13,
    })
    public hour: number;

    @ApiProperty({
        required: true,
        type: Number,
        example: 1,
    })
    public duration: number;

    public participants: string[] = [];
}
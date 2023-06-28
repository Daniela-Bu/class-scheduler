import { ApiProperty } from "@nestjs/swagger";
import { Day, days } from "src/core/enums/days";

export class FindClassesByDayDto {
    @ApiProperty({
        required: true,
        type: String,
        example: days[1],
    })
    public day: string;
}
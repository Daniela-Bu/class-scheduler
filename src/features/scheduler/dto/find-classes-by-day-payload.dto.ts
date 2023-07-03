import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { days } from "src/core/enums/days";

enum Day {
    Sunday = 'Sunday',
    Monday = 'Monday',
    Tuesday = 'Tuesday',
    Wednesday = 'Wednesday',
    Thursday = 'Thursday',
    Friday = 'Friday',
}

export class FindClassesByDayDto {
    @ApiProperty({
        required: true,
        enum: Day,
        example: days[1],
    })
    @IsEnum(Day)
    public day: Day;
}
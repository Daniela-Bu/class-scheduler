import { ApiProperty } from "@nestjs/swagger";
import { Day, days } from "src/core/enums/days";
import { ClassType } from "src/core/enums/class-type.enum";

export class UnsignClassDto {
    @ApiProperty({
        required: true,
        enum: ClassType,
        example: ClassType.PILATES,
    })
    public name: string;
    
    
    @ApiProperty({
        required: true,
        type: String,
        example: 'Daniela'
    })
    public tutor: string;
    
    @ApiProperty({
        required: true,
        type: String,
        example: days[1],
    })
    public day: Day;
    
    
    @ApiProperty({
        required: true,
        type: String,
        example: 15,
    })
    public hour: number;
}
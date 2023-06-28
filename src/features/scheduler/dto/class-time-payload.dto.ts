import { ApiProperty } from "@nestjs/swagger";

export class ClassTimePayloadDto {
    @ApiProperty({
        required: true,
        type: String,
        example: new Date(),
    })
    public date: string;

    @ApiProperty({
        required: true,
        type: Number,
        example: 1,
    })
    public duration: number;

    public participants: string[] = [];
}
import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from "mongoose";

export class GetUserPayloadDto {
    @ApiProperty({
        required: true,
        example: 'daniela'
    })
    public userName: string;
}
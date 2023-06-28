import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ClassTime } from "./class-time.schema";

export type ClassDocument = HydratedDocument<Class>

@Schema()
export class Class {
    @Prop()
    public className: string;

    @Prop()
    public tutor: string;

    @Prop()
    public maxParticipants: number;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
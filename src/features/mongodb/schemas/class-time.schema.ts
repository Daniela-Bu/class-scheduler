import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ClassType } from "src/core/enums/class-type.enum";

export type ClassTimeDocument = HydratedDocument<ClassTime>

@Schema()
export class ClassTime {
    @Prop()
    classId: string;

    @Prop()
    className: ClassType;
    
    @Prop()
    day: String;
    
    @Prop()
    hour: number;

    @Prop()
    date: Date;

    @Prop()
    duration: number;

    @Prop()
    participants: string[];
}

export const ClassTimeSchema = SchemaFactory.createForClass(ClassTime);
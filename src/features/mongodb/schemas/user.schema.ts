import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { VerificationQuestion } from "../../../core/enums/verification-question.enum";
import { Role } from "src/core/enums/role.enum";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
    @Prop({ required: true })
    public userName: string;

    @Prop({ required: true })
    public password: string;

    @Prop({ required: true })
    public name: string;

    @Prop({ required: true })
    public roles: Role[];

    @Prop({ required: true })
    public email: string;

    @Prop({ required: true })
    public maxClassesPerWeek: number;
    
    @Prop({ required: true })
    public classesLeftForWeek: number;

    @Prop({ required: true })
    public question: VerificationQuestion;

    @Prop({ required: true })
    public answer: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
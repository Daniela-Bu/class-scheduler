import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { IsEnum, IsNumber, IsString, ValidateNested } from "class-validator";
import { HydratedDocument } from "mongoose";
import { Role } from "src/core/enums/role.enum";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
    @Prop({ required: true })
    public userName: string;

    @Prop({ required: true })
    public password: string;    // TODO don't store password just like this

    @Prop({ required: true })
    public name: string;

    @Prop({ required: true })
    public age: number;

    @Prop({ required: true })
    public role: Role;

    @Prop({ required: true })
    public email: string;

    @Prop({ required: true })
    public maxClassesPerWeek: number;
    
    @Prop({ required: true })
    public classesLeftForWeek: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema({
    timestamps:true
})

export class User {
    @Prop({require:true})
    name : String;

    @Prop({require:true})
    email : String;

    @Prop({require:true})
    password : String;

}

export const UserSchema = SchemaFactory.createForClass(User)
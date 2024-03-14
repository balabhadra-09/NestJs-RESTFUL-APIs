import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BookModule } from "src/book/book.module";


@Schema({
    timestamps :true
})
export class Book {
    @Prop({require:true})
    title : String;

    @Prop({require : true})
    author : String;

    @Prop({require : true})
    published : String;
    @Prop({require : true})
    price : Number;


}

export const BookSchema = SchemaFactory.createForClass(Book)
import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Book } from 'src/schemas/book.schema';

@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name) private bookModel : mongoose.Model<Book>){}




async findAll(): Promise<Book[]> {
    try {
        const books = await this.bookModel.find().exec();
        return books;
    } catch (error) {
        console.error(error);
        throw new BadGatewayException();
    }
}

async create(book: Book): Promise<Book> {
    try {
        const newBook = await this.bookModel.create(book);
        return newBook;
    } catch (error) {
        console.error(error);
        throw new BadRequestException('Failed to create book.');
    }
}

async findOne(id: string): Promise<Book> {
    try {
        const book = await this.bookModel.findById(id).exec();
        if (!book) {
            throw new NotFoundException('Book not found.');
        }
        return book;
    } catch (error) {
        console.error(error);
        throw new BadRequestException('Failed to find book.');
    }
}

async updateOne(id: string, updateData: Partial<Book>): Promise<Book> {
    try {
        const updatedBook = await this.bookModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
        if (!updatedBook) {
            throw new NotFoundException('Book not found.');
        }
        return updatedBook;
    } catch (error) {
        console.error(error);
        throw new BadRequestException('Failed to update book.');
    }
}

async deleteOne(id: string): Promise<Book> {
    try {
        const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();
        if (!deletedBook) {
            throw new NotFoundException('Book not found.');
        }
        return deletedBook;
    } catch (error) {
        console.error(error);
        throw new BadRequestException('Failed to delete book.');
    }
}
}  
import { Body, Controller, Delete, Get, Param, Post, Put, } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from 'src/schemas/book.schema';
import { createBookDto } from './dto/createbook.dto';
import { updateBookDto } from './dto/updatebook.dto';



@Controller('book')
export class BookController {
    constructor(private bookservice : BookService){}
    

@Get()
async getAllBooks(): Promise<Book[]> {
    return this.bookservice.findAll();
}

@Post('create')
async createBook(@Body() createBookDto: createBookDto): Promise<Book> {
    return this.bookservice.create(createBookDto);
}

@Get(':id')
async getBook(@Param('id') id: string): Promise<Book> {
    return this.bookservice.findOne(id);
}

@Put(':id')
async updateBook(@Param('id') id: string, @Body() updateBookDto: updateBookDto): Promise<Book> {
    return this.bookservice.updateOne(id, updateBookDto);
}

@Delete(':id')
async deleteBook(@Param('id') id: string): Promise<Book> {
    return this.bookservice.deleteOne(id);
}
}


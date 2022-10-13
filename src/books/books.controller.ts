import { Controller, Get, Res, HttpStatus, Query, Param } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './interfaces/book';

@Controller('book/search')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getBooks(@Res() res: any, @Query() query: any): Array<Book> {
    const books = this.booksService.getBooks(query);
    return res.status(HttpStatus.OK).json(books);
  }

  @Get(':id')
  getBookById(@Res() res: any, @Param('id') id: string): Book {
    const book = this.booksService.getBookById(id);
    return res.status(HttpStatus.OK).json(book);
  }
}

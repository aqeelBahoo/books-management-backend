import { Injectable } from '@nestjs/common';
import { Book } from './interfaces/book';
import * as books from './entities/books.json';

@Injectable()
export class BooksService {
  getBooks(query: any): Array<Book> {
    if (JSON.stringify(query) === JSON.stringify({})) {
      return books;
    }
    return this.searchBooks(query);
  }

  getBookById(id: string): Book {
    if (!id) {
      return null;
    }
    return books.find(({ title }) => id == title);
  }

  searchBooks(q: any): Array<Book> {
    console.log(q);
    return books.filter((b: Book) => {
      return (
        (!q.title || b.title?.toLowerCase() === q.title.toLowerCase()) &&
        (!q.author ||
          b.authors?.some(
            (a) => a.toLowerCase() === q.author?.toLowerCase(),
          )) &&
        (!q.price || b.published?.price === Number(q.price)) &&
        (!q.category ||
          b.categories?.some(
            (c) => c.toLowerCase() === q.category?.toLowerCase(),
          ))
      );
    });
  }
}

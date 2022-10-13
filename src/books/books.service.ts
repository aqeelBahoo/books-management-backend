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
    return books.filter((b: Book) => {
      return (
        (!q.title || b.title?.toLowerCase() === q.title.toLowerCase()) &&
        (!q.price || b.published?.price === Number(q.price)) &&
        (!q.fullDate ||
          new Date(b.published.$date).toLocaleDateString() ===
            new Date(q.fullDate).toLocaleDateString()) &&
        (!q.year ||
          new Date(b.published.$date).getFullYear() === Number(q.year)) &&
        (!q.author ||
          b.authors?.some(
            (a) => a.toLowerCase() === q.author?.toLowerCase(),
          )) &&
        (!q.category ||
          b.categories?.some(
            (c) => c.toLowerCase() === q.category?.toLowerCase(),
          ))
      );
    });
  }
}

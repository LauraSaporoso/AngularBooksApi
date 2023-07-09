import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../model/book.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteBookService {
  favouriteBooks: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  favouriteBooks$ = this.favouriteBooks.asObservable();
  constructor() {}

  AddFavoriteBook(book: any) {
    const retrieveFavoriteBooks = this.favouriteBooks.value;
    const newFavoriteBook: Book = {
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors,
      thumbnailUrl: book.volumeInfo.thumbnail,
      description: book.volumeInfo.description,
    };

    // Check if the book already exists in the favorite books list
    const existingBook = retrieveFavoriteBooks.find(
      (b) =>
        b.title === newFavoriteBook.title && b.author === newFavoriteBook.author
    );

    if (!existingBook) {
      retrieveFavoriteBooks.push(newFavoriteBook);
      this.favouriteBooks.next(retrieveFavoriteBooks);
      console.log(this.favouriteBooks$);
    } else {
      console.log('The book already exists in the favorite books list.');
    }
  }

  RemoveFavoriteBook(book: Book) {
    const retrieveFavoriteBooks = this.favouriteBooks.value;
    const updatedFavoriteBooks = retrieveFavoriteBooks.filter(
      (b) => b.title !== book.title || b.author !== book.author
    );

    this.favouriteBooks.next(updatedFavoriteBooks);
  }
}

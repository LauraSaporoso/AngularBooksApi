import { Injectable } from '@angular/core';
import { Book } from '../model/book.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookFavoriteService {
  //Creo uno spazio nello storage
  private storageKey = 'favoriteBooks';

  favouriteBooks: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  favouriteBooks$ = this.favouriteBooks.asObservable();
  constructor() {
    this.loadFavoriteBooks();
  }

  // Mi consente di recuperare i preferit allocati nello storage
  private loadFavoriteBooks() {
    const savedFavoriteBooks = localStorage.getItem(this.storageKey);
    if (savedFavoriteBooks) {
      const favoriteBooks = JSON.parse(savedFavoriteBooks) as Book[];
      this.favouriteBooks.next(favoriteBooks);
    }
  }

  //Metodo usato nei metodi add e remove favorite book per aggiornare la lista localmente
  private saveFavoriteBooksLocally(books: Book[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(books));
  }

  //Metodo add che non fa pushare lo stesso elemento più volte
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
      this.saveFavoriteBooksLocally(retrieveFavoriteBooks);
      console.log(this.favouriteBooks$);
    } else {
      console.log('The book already exists in the favorite books list.');
      alert('The book already exists in the favorite books list.');
    }
  }

  //Metodo remove
  RemoveFavoriteBook(book: Book) {
    const retrieveFavoriteBooks = this.favouriteBooks.value;
    const updatedFavoriteBooks = retrieveFavoriteBooks.filter(
      (b) => b.title !== book.title || b.author !== book.author
    );

    this.favouriteBooks.next(updatedFavoriteBooks);

    this.saveFavoriteBooksLocally(updatedFavoriteBooks);
  }
}

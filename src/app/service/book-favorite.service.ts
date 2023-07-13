import { Injectable } from '@angular/core';
import { Book } from '../model/book.model';
import { BehaviorSubject, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookFavoriteService {
  //Creo uno spazio nello storage
  private storageKey = 'favoriteBooks';
  private apiUrlBooks = 'https://www.googleapis.com/books/v1/volumes/';

  favouriteBooks: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  favouriteBooks$ = this.favouriteBooks.asObservable();
  constructor(private http: HttpClient) {
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

  addFavoriteBook(book: any) {
    console.log(book.id);
    this.http
      .get<any>(this.apiUrlBooks + book.id)
      .pipe(
        tap((newBook: any) => {
          console.log(newBook);
          const newFavoriteBook = {
            title: newBook.volumeInfo.title,
            author: newBook.volumeInfo.authors,
            thumbnailUrl: newBook.volumeInfo.imageLinks.thumbnail,
            description: newBook.volumeInfo.description,
          };

          const retrieveFavoriteBooks = this.favouriteBooks.value;
          // Check if the book already exists in the favorite books list
          const existingBook = retrieveFavoriteBooks.find(
            (b) =>
              b.title === newFavoriteBook.title &&
              JSON.stringify(b.author) ===
                JSON.stringify(newFavoriteBook.author)
          );

          if (!existingBook) {
            retrieveFavoriteBooks.push(newFavoriteBook);
            console.log(newFavoriteBook);
            this.favouriteBooks.next(retrieveFavoriteBooks);
            this.saveFavoriteBooksLocally(retrieveFavoriteBooks);
            console.log(this.favouriteBooks.getValue());
          } else {
            console.log('The book already exists in the favorite books list.');
            alert('The book already exists in the favorite books list.');
          }
        }),
        tap({
          error: (error) => {
            console.error('An error occurred:', error);
          },
        })
      )
      .subscribe();
  }

  //Metodo remove book
  RemoveFavoriteBook(book: Book) {
    const retrieveFavoriteBooks = this.favouriteBooks.value;
    const updatedFavoriteBooks = retrieveFavoriteBooks.filter(
      (b) => b.title !== book.title || b.author !== book.author
    );

    this.favouriteBooks.next(updatedFavoriteBooks);

    this.saveFavoriteBooksLocally(updatedFavoriteBooks);
  }
}

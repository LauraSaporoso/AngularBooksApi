import { Component, OnInit } from '@angular/core';
import { BookService } from '../service/book.service';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  tap,
} from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Book, BookAutoComplete } from '../model/book.model';
import { FavoriteBookService } from '../service/book-favorite.service';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css'],
})
export class SearchBookComponent implements OnInit {
  myControl = new FormControl();
  filteredOptions!: Observable<BookAutoComplete[]>;

  constructor(
    private bookService: BookService,
    private favoriteBookService: FavoriteBookService,
    private router: Router,
    private http: HttpClient
  ) {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value: string) => (value ? this._filter(value) : []))
    );
  }

  ngOnInit(): void {}

  searchBooks(): void {
    const searchTerm = this.myControl.value;
    this.bookService
      .searchBooks(searchTerm.title ?? searchTerm) // passo valore titolo per ottenere url giusto nel service
      .pipe(
        tap({
          // next riceve i dati emessi dall'observable e li mette in data
          next: (data) => {
            console.log(data.items);
            this.bookService.updateSearchResults$(data.items);
          },
          error: (error) => {
            console.error('An error occurred:', error);
          },
        })
      )
      .subscribe();

    this.myControl.reset();
  }

  get searchResults$() {
    return this.bookService.searchResults$;
  }

  showDetails(idBook: string) {
    console.log('Id selezionato uguale a ' + idBook);
    this.router.navigateByUrl('/details/' + idBook);
    this.bookService.idDetails = idBook;
  }

  addToFavoriteBooks(book: any) {
    this.favoriteBookService.AddFavoriteBook(book);
  }

  displayFn(book: Book): string {
    return book && book.title ? book.title : '';
  }

  private _filter(value: string): BookAutoComplete[] {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${value}`;
    const books: BookAutoComplete[] = [];
    this.http
      .get(apiUrl)
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((response: any) => {
        if (response && response.items) {
          response.items.forEach((item: any) => {
            const book: BookAutoComplete = {
              title: item.volumeInfo.title,
              // Add other properties as needed
            };
            books.push(book);
          });
        }
      });
    return books;
  }
}

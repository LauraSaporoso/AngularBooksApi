import { Component } from '@angular/core';
import { BookService } from '../service/book.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-books-input',
  templateUrl: './books-input.component.html',
  styleUrls: ['./books-input.component.css'],
})
export class BooksInputComponent {
  searchResults!: any[];
  searchQuery = '';
  constructor(private bookService: BookService) {}

  searchBooks(): void {
    this.bookService
      .searchBooks(this.searchQuery)
      .pipe(
        tap({
          next: (data) => {
            console.log(data.items);
            this.searchResults = data.items;
          },
          error: (error) => {
            console.error('An error occurred:', error);
          },
        })
      )
      .subscribe();
  }
}

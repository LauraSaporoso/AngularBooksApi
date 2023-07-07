import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../service/book-service.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css'],
})
export class SearchBookComponent implements OnInit {
  searchResults!: any[];
  searchQuery = 'Harry Potter'; // valore input titolo
  constructor(
    private bookService: BookServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  searchBooks(): void {
    this.bookService
      .searchBooks(this.searchQuery) // passo valore titolo per ottenere url giusto nel service
      .pipe(
        tap({
          // next riceve i dati emessi dall'observable e li mette in data
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

  showDetails(idBook: string) {
    console.log('Id selezionato uguale a ' + idBook);
    this.router.navigateByUrl('/details/' + idBook);
    this.bookService.idDetails = idBook;
  }
}

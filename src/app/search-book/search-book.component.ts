import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../service/book-service.service';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  tap,
} from 'rxjs';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Book, BookAutoComplete } from '../model/book.model';
import { HttpClient } from '@angular/common/http';
import { BookFavoriteService } from '../service/book-favorite.service';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css'],
})
export class SearchBookComponent implements OnInit {
  searchResults!: any[];
  myControl = new FormControl();
  filteredOptions!: Observable<BookAutoComplete[]>;

  constructor(
    private bookService: BookServiceService,
    private router: Router,
    private http: HttpClient,
    private favoriteBookService: BookFavoriteService
  ) {
    // valueChanges fa parte del modulo ReactiveFormsModule ed è utilizzato per monitorare i cambiamenti del valore di un FormControl.
    this.filteredOptions = this.myControl.valueChanges.pipe(
      // L'operatore startWith viene utilizzato per emettere un valore iniziale nel flusso degli eventi.
      startWith(''),

      // se valore non è una stringa vuota viene chiamato _filter per filtrare le opzioni, se invece, sarà vuota viene restituito un array vuoto
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
  }

  /*
  displayTitle() La logica all'interno del metodo controlla se l'oggetto book è valido e se ha una proprietà title definita. Se entrambe le condizioni sono vere, viene restituito il valore della proprietà title del libro come stringa.

  Se l'oggetto book non è valido o non ha la proprietà title definita, viene restituita una stringa vuota ('').
  */

  displayTitle(book: Book): string {
    return book && book.title ? book.title : '';
  }

  showDetails(idBook: string) {
    console.log('Id selezionato uguale a ' + idBook);
    this.router.navigateByUrl('/details/' + idBook);
    this.bookService.idDetails = idBook;
  }

  // desideriamo filtrare tramite valore string
  // underscore _ per indicare un metodo privato da usare solo in questo componente
  private _filter(value: string): BookAutoComplete[] {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${value}`;

    // creiamo array books che conterrà i libri ottenuti con chiamata API
    const books: BookAutoComplete[] = [];

    this.http
      .get(apiUrl)

      /* - debounceTime(300) -> crea ritardo di 300millisec tra le richieste x evitare troppe richieste mentre l'utente sta digitando
      - distinctUntilChanged() -> assicura che la richiesta venga inviata solo se il valore è cambiato rispetto all'ultima richiesta */
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((response: any) => {
        // if response esiste e response contiene array di elementi
        if (response && response.items) {
          // si itera e si crea oggetto book con titolo
          response.items.forEach((item: any) => {
            const book: BookAutoComplete = {
              title: item.volumeInfo.title,
            };
            // oggetto book: BookAutoComplete viene aggiunto all'array books
            books.push(book);
          });
        }
      });
    return books;
  }

  get searchResults$() {
    return this.bookService.searchResults$;
  }

  //Aggiunge il libro alla lista dei preferiti del service
  addToFavoriteBooks(book: any) {
    this.favoriteBookService.AddFavoriteBook(book);
  }
}

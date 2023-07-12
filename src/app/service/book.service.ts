import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrlBooks = 'https://www.googleapis.com/books/v1/volumes';
  private apiUrlBook = 'https://www.googleapis.com/books/v1/volumes/';
  idDetails!: string;

  private searchResults: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  searchResults$ = this.searchResults.asObservable();

  constructor(private http: HttpClient) {}

  /*
  ESEMPIO: https://www.googleapis.com/books/v1/volumes?q=search+terms&max-results=40
  con PARAMS: https://www.googleapis.com/books/v1/volumes/q=valorediquery&max-results=10
  */

  // chiamata http lista di oggetti
  searchBooks(query: string): Observable<any> {
    const params = {
      q: query,
      maxResults: '10',
    };
    return this.http.get<any>(this.apiUrlBooks, { params }).pipe(
      map((response) => {
        // Filter out books without a thumbnail
        const filteredItems = response.items.filter(
          (item: any) =>
            item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail
        );
        response.items = filteredItems;
        return response;
      })
    );
  }

  // chiamata http di 1 solo oggetto
  specificBook(): Observable<any> {
    return this.http.get<any>(this.apiUrlBook + this.idDetails);
  }

  updateSearchResults$(results: any[]) {
    this.searchResults.next(results);
  }
}

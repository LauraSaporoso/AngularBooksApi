import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookServiceService {
  private apiUrlBooks = 'https://www.googleapis.com/books/v1/volumes';
  private apiUrlBook = 'https://www.googleapis.com/books/v1/volumes/';

  idDetails!: string;
  constructor(private http: HttpClient) {}

  /*
  ESEMPIO: https://www.googleapis.com/books/v1/volumes?q=search+terms&max-results=40
  con PARAMS: https://www.googleapis.com/books/v1/volumes/q=valorediquery&max-results=10
  */

  searchBooks(query: string): Observable<any> {
    const params = {
      q: query,
      maxResults: '10',
    };

    return this.http.get<any>(this.apiUrlBooks, { params });
  }

  specificBook(): Observable<any> {
    console.log('BOOOOOOK ID ' + this.idDetails);
    return this.http.get<any>(this.apiUrlBook + this.idDetails);
  }
}

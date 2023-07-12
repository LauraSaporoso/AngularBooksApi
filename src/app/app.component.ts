import { Component } from '@angular/core';
import { BookFavoriteService } from './service/book-favorite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AngularBooksApi';

  constructor(private favoriteBookService: BookFavoriteService) {}

  get favBooks$() {
    return this.favoriteBookService.favouriteBooks$;
  }
}

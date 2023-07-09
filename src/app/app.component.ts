import { Component } from '@angular/core';
import { FavoriteBookService } from './service/book-favorite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AngularBooksApi';
  constructor(private favoriteBookService: FavoriteBookService) {}

  get favBooks$() {
    return this.favoriteBookService.favouriteBooks$;
  }
}

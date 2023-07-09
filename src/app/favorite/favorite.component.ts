import { Component, OnInit } from '@angular/core';
import { FavoriteBookService } from '../service/book-favorite.service';
import { Book } from '../model/book.model';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent implements OnInit {
  constructor(private favoriteBookService: FavoriteBookService) {}

  ngOnInit(): void {}

  get favBooks$() {
    return this.favoriteBookService.favouriteBooks$;
  }

  removeBook(book: Book) {
    this.favoriteBookService.RemoveFavoriteBook(book);
  }
}

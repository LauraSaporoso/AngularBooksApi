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

  //Prendo dal service la lista dei libri preferiti
  get favBooks$() {
    return this.favoriteBookService.favouriteBooks$;
  }

  //Rimuove libro dalla lista dei libri preferiti
  removeBook(book: Book) {
    this.favoriteBookService.RemoveFavoriteBook(book);
  }
}

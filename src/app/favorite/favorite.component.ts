import { Component, OnInit } from '@angular/core';
import { BookFavoriteService } from '../service/book-favorite.service';
import { Book } from '../model/book.model';
import { BookServiceService } from '../service/book-service.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent implements OnInit {
  panelOpenState = false;
  constructor(
    private favoriteBookService: BookFavoriteService,
    private bookService: BookServiceService
  ) {}

  ngOnInit(): void {}

  //Prendo dal service la lista dei libri preferiti
  get favBooks$() {
    return this.favoriteBookService.favouriteBooks$;
  }

  //Rimuove libro dalla lista dei libri preferiti
  removeBook(book: Book) {
    this.favoriteBookService.RemoveFavoriteBook(book);
  }

  removeTags(htmlString: string): string {
    return this.bookService.removeTags(htmlString);
  }
}

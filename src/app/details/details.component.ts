import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BookServiceService } from '../service/book-service.service';
import { Observable, tap } from 'rxjs';
import { FavoriteComponent } from '../favorite/favorite.component';
import { BookFavoriteService } from '../service/book-favorite.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private location: Location,
    private bookService: BookServiceService,
    private favoriteBookService: BookFavoriteService
  ) {}

  idBookFromService!: string;
  resultsFromId!: any;

  newUrl!: any;

  ngOnInit(): void {
    console.log(this.specificBookDetails());
  }

  specificBookDetails(): void {
    this.bookService
      .specificBook()
      .pipe(
        tap({
          next: (data) => {
            this.resultsFromId = data;
            console.log(this.resultsFromId);
          },
          error: (error) => {
            console.error('An Error occured:', error);
          },
        })
      )
      .subscribe();
  }

  goBack() {
    this.location.back();
  }

  removeTags(htmlString: string): string {
    return this.bookService.removeTags(htmlString);
  }

  addFavorite() {
    this.favoriteBookService.addFavoriteBook(this.resultsFromId);
  }
}

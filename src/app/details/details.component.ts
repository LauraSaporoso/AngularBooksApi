import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BookServiceService } from '../service/book-service.service';
import { tap } from 'rxjs';
import { BookFavoriteService } from '../service/book-favorite.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private location: Location,
    private bookService: BookServiceService,
    private favoriteBookService: BookFavoriteService,
    private route: ActivatedRoute
  ) {}

  idBookFromService!: string;
  resultsFromId!: any;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const paramValue = params['idBook']; // Replace 'paramName' with the actual parameter name you're expecting
      this.idBookFromService = paramValue;
    });
    this.specificBookDetails(this.idBookFromService);
  }

  specificBookDetails(bookId: string): void {
    this.bookService
      .specificBook(bookId)
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

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BookServiceService } from '../service/book-service.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private location: Location,
    private bookService: BookServiceService
  ) {}

  idBookFromService!: string;
  resultsFromId!: any[];

  newUrl!: any;

  ngOnInit(): void {
    this.idBookFromService = this.bookService.idDetails;
    /*     console.log(this.idBookFromService); */
    this.newUrl = this.bookService.specificBook;

    this.specificBook();
    /*  console.log('prova result' + this.resultsFromId);
    console.log('questo è from service' + this.idBookFromService); */
  }

  specificBook(): void {
    this.bookService.specificBook(this.idBookFromService).pipe(
      tap({
        next: (data) => {
          console.log(data.items);
          this.resultsFromId = data.items;
        },
        error: (error) => {
          console.error('An Error occured:', error);
        },
      })
    );
  }

  goBack() {
    this.location.back();
  }
}

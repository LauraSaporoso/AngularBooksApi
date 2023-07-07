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
  resultsFromId!: any;

  ngOnInit(): void {}

  specificBookDetails(): void {
    this.bookService
      .specificBook()
      .pipe(
        tap({
          next: (data) => {
            console.log(data);
            this.resultsFromId = data;
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
}

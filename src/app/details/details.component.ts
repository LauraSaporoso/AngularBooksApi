import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BookService } from '../service/book.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  constructor(private location: Location, private bookService: BookService) {}

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

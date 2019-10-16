import { Component, OnInit } from '@angular/core';
import {BooksService} from '../../services/books.service';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-book-barcodes',
  templateUrl: './book-barcodes.component.html',
  styleUrls: ['./book-barcodes.component.scss']
})
export class BookBarcodesComponent implements OnInit {
  barcodes;
  barcodesCount;
  imageUrl = environment.booksServer + '/image/barcode/';

  constructor(
    private booksService: BooksService
  ) { }

  afterDeleteList(result) {
    this.getBarcodes();
  }

  deleteList() {
    this.booksService.deleteBarcodeList().subscribe(result =>
    this.afterDeleteList(result));
  }

  afterGetBarcodes(result) {
    // console.log(result);
    this.barcodesCount = result.count;

    this.barcodes = result.lines.map(line => {
      const parts = line.split(',');
      if (parts.length > 1) {
        return {
          title: parts[0],
          isbn: parts[1]
        }
      }
    })
  }

  getBarcodes() {
    this.booksService.getBarcodes().subscribe(result => this.afterGetBarcodes(result));
  }

  ngOnInit() {
    this.getBarcodes();
  }

}

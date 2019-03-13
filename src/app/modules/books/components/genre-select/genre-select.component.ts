import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BooksService} from '../../services/books.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-genre-select',
  templateUrl: './genre-select.component.html',
  styleUrls: ['./genre-select.component.scss']
})
export class GenreSelectComponent implements OnInit {
  genres;
  @Input() genre;
  @Output() genreChange = new EventEmitter();

  constructor(
    private router: Router,
    private booksService: BooksService
  ) { }

  onSelectionChange(e) {
    this.genreChange.emit(e.value);
  }

  ngOnInit() {
    this.booksService.getGenres().subscribe(
      genres => {
        this.genres = genres;
        this.genres.unshift('alle')
      }
    )
  }

}

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BooksService} from '../../services/books.service';
import {StateService} from '../../../../services/state.service';
import {Author} from '../../../../classes/book/author';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {DialogAuthorComponent} from '../../dialogs/dialog-author/dialog-author.component';
import {DataField} from '../../../movies/components/directors/DataField';
import {environment} from '../../../../../environments/environment';

const dataFields: DataField[] = [
  {
    name: 'first',
    label: 'Voornaam',
  },
  {
    name: 'last',
    label: 'Achternaam',
  },
  {
    name: 'born',
    label: 'Geboren',
  },
  {
    name: 'died',
    label: 'Dood',
  },
  {
    name: 'genre',
    label: 'Genre',
  },
  {
    name: 'country',
    label: 'Land',
  },
  {
    name: 'title',
    label: '1e boek'
  },
  {
    name: 'booksCount',
    label: '#',
  },
  {
    name: 'imgsrc',
    label: 'img'
  }
];

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  authors: Author[];
  filteredAuthors: Author[];
  displayedColumns = ['first', 'last', 'born', 'died', 'genre',
    'country', 'title', 'booksCount', 'imgsrc'];
  fields = dataFields;
  query: string;
  dataSource;
  genre;
  filteredCount;
  imageUrl = environment.booksServer + '/image/author/';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('authorImage', {read: ElementRef}) authorImage;

  constructor(
    private booksService: BooksService,
    private stateService: StateService,
    private dialog: MatDialog,
  ) { }

  clearFilter(input) {
    input.value = '';
    this.applyFilter('');
    input.focus();
  }

  afterSaved(author) {
    for (let i = 0; i < this.authors.length; i++) {
      if (this.authors[i].id === author.id) {
        for (let prop in author) {
          if (author.hasOwnProperty(prop)) {
            this.authors[i][prop] = author[prop];
          }
        }
      }
    }
  }

  afterRemoved(author) {
    for (let i = 0; i < this.filteredAuthors.length; i++) {
      if (this.filteredAuthors[i].id === author.id) {
        this.filteredAuthors[i].deleted = true;
      }
    }
  }

  afterEdit(result) {
    if (!result || !result.author) {
      return;
    }
    const {status, author} = result;
    switch(status) {
      case 'saved':
        this.afterSaved(author);
        break;
      case 'removed':
        this.afterRemoved(author);
        break;
    }
  }

  edit(row) {
    const dialogRef = this.dialog.open(DialogAuthorComponent, {
      data: {
        width: '600px',
        author: row
      }
    });
    dialogRef.afterClosed().subscribe(
      result => this.afterEdit(result)
    );
  }

  keyApplyFilter(e) {
    this.applyFilter(e.target['value']);
  }

  applyFilter(filterValue) {
    const value = filterValue ? filterValue.trim().toLowerCase() : null;
    this.dataSource.filter = value;
    this.filteredCount = this.dataSource.filteredData.length;
  }

  renderAuthors() {
    this.dataSource = new MatTableDataSource(this.filteredAuthors);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
    });
  }

  afterGetAuthors(result) {
    // console.log(result[0]);
    this.filteredAuthors = this.authors = result;
    this.renderAuthors();
  }

  ngOnInit() {
    this.stateService.setTitle('Auteurs');
    this.booksService.getAuthors().subscribe(
      result => this.afterGetAuthors(result)
    )
  }

}

import {Component, OnInit, ViewChild} from '@angular/core';
import {BooksService} from '../../services/books.service';
import {StateService} from '../../../../services/state.service';
import {Author} from '../../../../classes/book/author';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {DialogAuthorComponent} from '../../dialogs/dialog-author/dialog-author.component';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  authors: Author[];
  filteredAuthors: Author[];
  displayedColumns = ['first', 'last', 'born', 'died', 'nbooks'];
  query: string;
  dataSource;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private booksService: BooksService,
    private stateService: StateService,
    private dialog: MatDialog,
  ) { }

  resetSearch() {
    this.query = null;
    this.search(null);
  }

  search(newValue: string) {
    if (!newValue || !newValue.length) {
      this.filteredAuthors = this.authors.slice();
      return;
    }
    const q = newValue.toLowerCase();
    this.filteredAuthors = this.authors.filter(
      (author: Author) => author.last.toLowerCase().indexOf(q) !== -1
        || author.first.toLowerCase().indexOf(q) !== -1
    );
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
        // this.filteredAuthors.splice(i, 1);
        // this.renderAuthors();
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  renderAuthors() {
    this.dataSource = new MatTableDataSource(this.filteredAuthors);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
    });
  }

  afterGetAuthors(result) {
    console.log(result[0]);
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

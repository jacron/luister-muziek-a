import {Component, OnInit} from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {StateService} from '../../../../services/state.service';
import {MoviesService} from '../../services/movies.service';
import {Director} from '../../../../classes/movies/Director';
import {DialogDirectorComponent} from '../../dialogs/dialog-director/dialog-director.component';
import {DataField} from './DataField';

const dataColumns = [
  'Voornaam', 'Achternaam', 'Geboortejaar', 'Sterfjaar', 'Land', 'nfilms'
];

const dataFields: DataField[] = [
  {
    name: 'Voornaam',
    label: 'Voornaam'
  },
  {
    name: 'Achternaam',
    label: 'Achternaam'
  },
  {
    name: 'Geboortejaar',
    label: 'Geboortejaar'
  },
  {
    name: 'Sterfjaar',
    label: 'Sterfjaar'
  },
  {
    name: 'ImageUrl',
    label: 'Afbeelding'
  },
  {
    name: 'imdb_id',
    label: 'IMDb id'
  },
  {
    name: 'Land',
    label: 'Land'
  },
  {
    name: 'nfilms',
    label: '#'
  },
];

@Component({
  selector: 'app-directors',
  templateUrl: './directors.component.html',
  styleUrls: ['./directors.component.scss']
})
export class DirectorsComponent implements OnInit {

  directors: Director[];
  displayedColumns = dataColumns;
  fields = dataFields;
  dataSource;
  filteredCount;
  saved = null;
  removed = null;

  constructor(
    private stateService: StateService,
    private dialog: MatDialog,
    private moviesService: MoviesService,
  ) { }

  setFilter(filterValue) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filteredCount = this.dataSource.filteredData.length;
  }

  afterEdit(result) {
    if (!result || !result.director) {
      return;
    }
    const {status, director} = result;
    switch(status) {
      case 'saved':
        this.saved = director;
        break;
      case 'removed':
        this.removed = director;
        break;
    }
  }

  edit(row) {
    const dialogRef = this.dialog.open(DialogDirectorComponent, {
      data: {
        width: '600px',
        director: row
      }
    });
    dialogRef.afterClosed().subscribe(
      result => this.afterEdit(result)
    );
  }

  afterFetchDirectors(result) {
    this.directors = result;
    const title = 'Regisseurs (' + this.directors.length + ')';
    this.stateService.setTitle(title);
    this.dataSource = new MatTableDataSource(this.directors);
  }

  fetchDirectors() {
    this.moviesService.getDirectors().subscribe(
      result => this.afterFetchDirectors(result)
    );
  }

  ngOnInit() {
    this.fetchDirectors();
  }

}

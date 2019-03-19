import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {StateService} from '../../../../services/state.service';
import {MoviesService} from '../../services/movies.service';
import {Director} from '../../../../classes/movies/Director';
import {DialogDirectorComponent} from '../../dialogs/dialog-director/dialog-director.component';
import {DataField} from './DataField';

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
  }
];

@Component({
  selector: 'app-directors',
  templateUrl: './directors.component.html',
  styleUrls: ['./directors.component.scss']
})
export class DirectorsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  directors: Director[];
  filteredDirectors: Director[];
  displayedColumns = ['Voornaam', 'Achternaam', 'Geboortejaar', 'Sterfjaar',
    'Land', 'nfilms'];
  fields = dataFields;
  dataSource;
  filteredCount;

  constructor(
    private stateService: StateService,
    private dialog: MatDialog,
    private moviesService: MoviesService,
  ) { }

  clearFilter(input) {
    input.value = '';
    this.applyFilter('');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filteredCount = this.dataSource.filteredData.length;
  }

  afterSaved(director) {
    // console.log(director);
    for (let i = 0; i < this.filteredDirectors.length; i++) {
      if (this.filteredDirectors[i].id === director.id) {
        for (let prop in director) {
          if (director.hasOwnProperty(prop)) {
            console.log(prop);
            this.filteredDirectors[i][prop] = director[prop];
          }
        }
      }
    }
  }

  afterRemoved(director) {
    for (let i = 0; i < this.filteredDirectors.length; i++) {
      if (this.filteredDirectors[i].id === director.id) {
        this.filteredDirectors[i].deleted = true;
      }
    }
  }

  afterEdit(result) {
    if (!result || !result.director) {
      return;
    }
    console.log(result);
    const {status, director} = result;
    switch(status) {
      case 'saved':
        this.afterSaved(director);
        break;
      case 'removed':
        this.afterRemoved(director);
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

  renderDirectors() {
    this.dataSource = new MatTableDataSource(this.filteredDirectors);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
    });
  }

  afterFetchDirectors(result) {
    // console.log(result[0]);
    this.filteredDirectors = this.directors = result;
    this.renderDirectors();
  }

  fetchDirectors() {
    this.moviesService.getDirectors().subscribe(
      result => this.afterFetchDirectors(result)
    );
  }

  ngOnInit() {
    this.stateService.setTitle('Regisseurs');
    this.fetchDirectors();
  }

}

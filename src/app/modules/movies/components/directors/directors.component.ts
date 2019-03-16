import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {StateService} from '../../../../services/state.service';
import {MoviesService} from '../../services/movies.service';
import {Director} from '../../../../classes/movies/Director';

@Component({
  selector: 'app-directors',
  templateUrl: './directors.component.html',
  styleUrls: ['./directors.component.scss']
})
export class DirectorsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  directors: Director[];
  filteredDirectors: Director[];
  displayedColumns = ['Voornaam', 'Achternaam', 'Geboortejaar', 'Sterfjaar', 'imdb_id'];
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

  edit() {
    // const dialogRef = this.dialog.open(DialogAuthorComponent, {
    //   data: {
    //     width: '600px',
    //     author: row
    //   }
    // });
    // dialogRef.afterClosed().subscribe(
    //   result => this.afterEdit(result)
    // );
  }

  renderDirectors() {
    this.dataSource = new MatTableDataSource(this.filteredDirectors);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
    });
  }

  afterFetchDirectors(result) {
    console.log(result[0]);
    // this.directors = result;
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

import { Component, OnInit } from '@angular/core';
import {Componist} from '../../../../classes/music/Componist';
import {MusicService} from '../../services/music.service';
import {StateService} from '../../../../services/state.service';
import {DataField} from '../../../movies/components/directors/DataField';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {DialogComponistComponent} from '../../dialogs/dialog-componist/dialog-componist.component';

const dataColumns: string[] = [
  'FirstName',
  'LastName',
  'Birth',
  'Death',
  'Country',
  'Genre'
];

const dataFields: DataField[] = [
  {
    name: 'FirstName',
    label: 'Voornaam'
  },
  {
    name: 'LastName',
    label: 'Achternaam'
  },
  {
    name: 'Birth',
    label: 'Geboren'
  },
  {
    name: 'Death',
    label: 'Gestorven'
  },
  {
    name: 'Genre',
    label: 'Genre'
  },
  {
    name: 'Country',
    label: 'Land'
  }
];

@Component({
  selector: 'app-componist',
  templateUrl: './componist.component.html',
  styleUrls: ['./componist.component.scss']
})
export class ComponistComponent implements OnInit {
  componisten: Componist[];
  displayedColumns = dataColumns;
  fields = dataFields;
  dataSource;
  filteredCount;
  saved = null;
  removed = null;

  constructor(
    private musicService: MusicService,
    private dialog: MatDialog,
    private stateService: StateService,
  ) { }

  setFilter(filterValue) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filteredCount = this.dataSource.filteredData.length;
  }

  afterEdit(result) {
    if (!result || !result.composer) {
      return;
    }
    const {status, composer} = result;
    switch(status) {
      case 'saved':
        this.saved = composer;
        break;
      case 'removed':
        this.removed = composer;
        break;
    }
  }

  edit(row) {
    const dialogRef = this.dialog.open(DialogComponistComponent, {
      data: {
        width: '600px',
        composer: row
      }
    });
    dialogRef.afterClosed().subscribe(
      result => this.afterEdit(result)
    );
  }

  afterGetComponisten(response) {
    this.componisten = <Componist[]>response;
    const title = 'Componisten (' + this.componisten.length + ')';
    this.stateService.setTitle(title);
    this.dataSource = new MatTableDataSource(response);
  }

  ngOnInit() {
    this.musicService.getComposers('startletter').subscribe(
      response => this.afterGetComponisten(response)
    );
  }

}

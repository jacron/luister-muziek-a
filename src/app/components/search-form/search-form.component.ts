import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Album} from '../../classes/Album';
import {Tag} from '../../classes/Tag';
import {Person} from '../../classes/Person';
import {SearchParams} from '../../classes/SearchParams';
import {MatDialog} from '@angular/material';
import {DialogCustomizeSearchComponent} from '../../dialogs/dialog-customize-search/dialog-customize-search.component';
import {MusicService} from '../../services/music.service';
import {Choice} from '../../classes/Choice';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnChanges, OnInit {
  @Input() params: SearchParams;
  @Input() composers: Person[];
  @Input() performers: Person[];
  @Input() collections: Album[];
  @Input() tags: Tag[];
  @Input() instruments;

  @Output() albums: EventEmitter<SearchParams> = new EventEmitter();

  idcomp = -1;
  idperf = -1;
  idcoll = -1;
  idtag = -1;
  idinstrument = -1;
  choices: Choice[];

  constructor(
    private dialog: MatDialog,
    private musicService: MusicService,
  ) { }

  choiceSelected(name) {
    if (this.choices) {
      for (let i = 0; i < this.choices.length; i++) {
        if (this.choices[i].name === name) {
          return this.choices[i].value;
        }
      }
    }
    return true;
  }

  resetFilters() {
    this.idperf = this.idcoll = this.idcomp = this.idtag =
      this.idinstrument = -1;
    this.getAlbums();
  }

  getAlbums() {
    const params: SearchParams = {
      idcomp: this.idcomp || -1,
      idperf: this.idperf || -1,
      idcoll: this.idcoll || -1,
      idtag: this.idtag || -1,
      idinstrument: this.idinstrument || -1
    };
    this.albums.emit(params);
  }

  onGetChoices(response) {
    const dialogRef = this.dialog.open(DialogCustomizeSearchComponent, {
      data: {
        choices: response
      }
    });
    dialogRef.afterClosed().subscribe(
      choices => {
        console.log(choices);
        this.choices = choices;
      }
    );
  }

  customize() {
    this.musicService.getChoices()
      .subscribe(
        response => this.onGetChoices(response)
      );
  }

  ngOnChanges(changes: SimpleChanges) {
    // update search parameters after navigating
    if (changes.params) {
      const params: SearchParams = <SearchParams>changes.params.currentValue;
      this.idcomp = params.idcomp;
      this.idperf = params.idperf;
      this.idcoll = params.idcoll;
      this.idtag = params.idtag;
      this.idinstrument = params.idinstrument;
    }
  }

  ngOnInit() {
  }

}

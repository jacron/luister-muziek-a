import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Album} from '../../classes/Album';
import {Tag} from '../../classes/Tag';
import {Person} from '../../classes/Person';
import {SearchParams} from '../../classes/SearchParams';
import {MatDialog} from '@angular/material';
import {DialogCustomizeSearchComponent} from '../../dialogs/dialog-customize-search/dialog-customize-search.component';
import {MusicService} from '../../services/music.service';
import {Choice} from '../../classes/Choice';
import {StorageService} from '../../services/storage.service';
import {ChoiceService} from '../../services/choice.service';

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
  filteredChoices: Choice[];

  constructor(
    private dialog: MatDialog,
    private musicService: MusicService,
    private storageService: StorageService,
    private choiceService: ChoiceService,
  ) { }

  getAlbums() {
    const params: SearchParams = {
      idcomp: this.choices[0].id || -1,
      idperf: this.choices[1].id || -1,
      idcoll: this.choices[2].id || -1,
      idtag: this.choices[3].id || -1,
      idinstrument: this.choices[4].id || -1
    };
    this.albums.emit(params);
  }

  onGetChoices(choices) {
    const dialogRef = this.dialog.open(DialogCustomizeSearchComponent, {
      data: {
        choices: choices
      }
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.choices = result;
          this.storageService.storeChoiceVisibilities(this.choices);
          this.filteredChoices = this.choices.filter(choice => choice.visible);
        }
      }
    );
  }

  customize() {
    this.onGetChoices(this.choiceService.getChoices());
  }

  prepareChoices() {
    this.choices = this.choiceService.getChoices();
    this.storageService.retrieveChoiceVisiblities(this.choices);
    this.choices[0].items = this.composers;
    this.choices[1].items = this.performers;
    this.choices[2].items = this.collections;
    this.choices[3].items = this.tags;
    this.choices[4].items = this.instruments;
    this.choices[0].id = this.idcomp;
    this.choices[1].id = this.idperf;
    this.choices[2].id = this.idcoll;
    this.choices[3].id = this.idtag;
    this.choices[4].id = this.idinstrument;
  }

  revealActiveChoice(id, index) {
    if (id && +id !== -1) {
      this.choices[index].visible = true;
    }
  }

  revealActiveChoices() {
    if (!this.choices) {
      return;
    }
    this.revealActiveChoice(this.idcomp, 0);
    this.revealActiveChoice(this.idperf, 1);
    this.revealActiveChoice(this.idcoll, 2);
    this.revealActiveChoice(this.idtag, 3);
    this.revealActiveChoice(this.idinstrument, 4);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.params) {
      // update search parameters after navigating
      const params: SearchParams = <SearchParams>changes.params.currentValue;
      this.idcomp = params.idcomp;
      this.idperf = params.idperf;
      this.idcoll = params.idcoll;
      this.idtag = params.idtag;
      this.idinstrument = params.idinstrument;
      this.revealActiveChoices(params);
    }
    if (changes.composers) {
      this.prepareChoices();
      this.revealActiveChoices();
      this.filteredChoices = this.choices.filter(choice => choice.visible);
      // console.log(this.filteredChoices);
    }
  }

  ngOnInit() {
  }

}

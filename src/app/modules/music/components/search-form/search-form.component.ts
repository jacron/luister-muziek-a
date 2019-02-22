import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Album} from '../../../../classes/music/Album';
import {Tag} from '../../../../classes/music/Tag';
import {Person} from '../../../../classes/music/Person';
import {SearchParams} from '../../../../classes/music/SearchParams';
import {MatDialog} from '@angular/material';
import {DialogCustomizeSearchComponent} from '../../../../dialogs/dialog-customize-search/dialog-customize-search.component';
import {MusicService} from '../../services/music.service';
import {Choice} from '../../../../classes/music/Choice';
import {StorageService} from '../../../../services/storage.service';
import {ChoiceService} from '../../services/choice.service';
import {FormControl} from '@angular/forms';

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

  @ViewChild('query') qv;

  idcomp = -1;
  idperf = -1;
  idcoll = -1;
  idtag = -1;
  idinstrument = -1;
  choices: Choice[];
  filteredChoices: Choice[];
  myControl = new FormControl();
  facets: any[] = [];

  constructor(
    private dialog: MatDialog,
    private musicService: MusicService,
    private storageService: StorageService,
    private choiceService: ChoiceService,
  ) { }

  getAlbums() {
    // send a request to get albums
    // console.log(this.myControl.value);
    const params: SearchParams = {
      idcomp: this.choices[0].id || -1,
      idperf: this.choices[1].id || -1,
      idcoll: this.choices[2].id || -1,
      idtag: this.choices[3].id || -1,
      idinstrument: this.choices[4].id || -1,
      search: this.myControl.value,
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

  clearQuery() {
    this.myControl.setValue('');
    this.qv.nativeElement.focus();
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

  remove(facet) {
    console.log('remove', facet);
    this.choices[0].id = -1;
    this.idcomp = -1;
    this.facets.splice(facet);
  }

  makeFacets() {
    if (!this.composers) {
      return;
    }
    if (this.idcomp && this.idcomp != -1) {
      // console.log(this.idcomp);
      const person: Person = this.composers.filter(
        composer => composer.ID == this.idcomp)[0];
      this.facets.push({
        name: person.FullName,
        color: '#ffeeee'
      });
    }

  }

  getParamChanges(params: SearchParams) {
    // update search parameters after navigating
    this.idcomp = params.idcomp;
    this.idperf = params.idperf;
    this.idcoll = params.idcoll;
    this.idtag = params.idtag;
    this.idinstrument = params.idinstrument;
    this.myControl.setValue(params.search || '');
    // this.revealActiveChoices();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.params) {
      this.getParamChanges(changes.params.currentValue);
    }
    if (changes.composers) {
      this.prepareChoices();
      this.revealActiveChoices();
      this.makeFacets();
      this.filteredChoices = this.choices.filter(choice => choice.visible);
    }
  }

  ngOnInit() {
  }

}

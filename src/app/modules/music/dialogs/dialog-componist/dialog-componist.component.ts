import {Component, Inject, OnInit} from '@angular/core';
import {Componist} from '../../../../classes/music/Componist';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MusicService} from '../../services/music.service';
import {BooksService} from '../../../books/services/books.service';
import {ComponistComponent} from '../../components/componist/componist.component';

@Component({
  selector: 'app-dialog-componist',
  templateUrl: './dialog-componist.component.html',
  styleUrls: ['./dialog-componist.component.scss']
})
export class DialogComponistComponent implements OnInit {
  composer: Componist;
  wiki = null;
  refresh;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ComponistComponent>,
    private musicService: MusicService,
    private booksService: BooksService,
  ) { }

  onClose(e) {
    console.log(e);
    this.dialogRef.close({status: e, composer: this.composer});
  }

  onLanguage(lng) {
    this.wikipedia(lng);
  }

  // afterStoreWikiPicture() {
  //   this.refresh = '?' + new Date();
  //   this.wiki.imgurl = null;
  // }

  useBorn(Birth) {
    this.composer = {
      ...this.composer,
      Birth
    }
  }

  useDied(Death) {
    this.composer = {
      ...this.composer,
      Death
    }
  }

  afterStoreWikiPicture() {
    this.refresh = '?' + new Date();
    this.wiki.imgurl = null;
  }

  storeWikiPicture(url: string) {
    this.musicService.storeWikiComposerImage(url, this.composer.ID).subscribe(
      () => this.afterStoreWikiPicture()
    )
  }

  afterWikipedia(result) {
    if (result) {
      this.wiki = result;
      if (result.image) {
        this.wiki.imgurl = result.image.source
      }
    }
  }

  wikipedia(lng) {
    const name = this.composer.FirstName + ' ' + this.composer.LastName;
    this.booksService.wikiAuthor(name, lng).subscribe(
      result => this.afterWikipedia(result),
      () => console.log('Geen wiki-gegevens voor taal: ' + lng)
    )
  }

  changeWiki(e) {
    this.wikipedia(e);
  }

  ngOnInit() {
    this.composer = this.data.composer;
    this.refresh = '?date=' + new Date();
    this.wikipedia('nl');
  }

}

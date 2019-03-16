import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DirectorsComponent} from '../../components/directors/directors.component';
import {Director} from '../../../../classes/movies/Director';
import {BooksService} from '../../../books/services/books.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dialog-director',
  templateUrl: './dialog-director.component.html',
  styleUrls: ['./dialog-director.component.scss']
})
export class DialogDirectorComponent implements OnInit {
  director: Director;
  showFilms = true;
  wiki = null;
  refresh;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DirectorsComponent>,
    private booksService: BooksService,
    private toastr: ToastrService,
  ) { }

  onClose(e) {
    // console.log(e);
    this.dialogRef.close({status: e, director: this.director});
  }

  toggleFilmsList() {
    this.showFilms = !this.showFilms;
  }

  onLanguage(lng) {
    this.wikipedia(lng);
  }

  afterStoreWiki() {
    // this.toastr.success('Wiki afbeelding opgeslagen', 'wiki');
    this.refresh = '?' + new Date();
    this.wiki.imgurl = null;
  }

  storeWikiPicture(e: string) {
    this.booksService.storeWikiAuthorImg(e, this.director.id).subscribe(
      () => this.afterStoreWiki()
    )
  }

  afterWikipedia(result) {
    // console.log(result);
    if (result) {
      this.wiki = result;
      if (result.image) {
        this.wiki.imgurl = result.image.source
      }
    }
  }

  wikipedia(lng) {
    const name = this.director.Voornaam + ' ' + this.director.Achternaam;
    this.booksService.wikiAuthor(name, lng).subscribe(
      result => this.afterWikipedia(result),
      () => this.toastr.error('Geen wiki-gegevens voor taal: ' + lng)
    )
  }

  changeWiki(e) {
    this.wikipedia(e);
  }

  ngOnInit() {
    this.director = this.data.director;
    this.refresh = '?date=' + new Date();
    this.wikipedia('nl');
  }

}

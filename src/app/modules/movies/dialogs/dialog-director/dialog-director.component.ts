import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DirectorsComponent} from '../../components/directors/directors.component';
import {Director} from '../../../../classes/movies/Director';
import {BooksService} from '../../../books/services/books.service';
// import {ToastrService} from 'ngx-toastr';
import {MoviesService} from '../../services/movies.service';

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
    private moviesService: MoviesService,
    // private toastr: ToastrService,
  ) { }

  onClose(e) {
    console.log(e);
    this.dialogRef.close({status: e, director: this.director});
  }

  toggleFilmsList() {
    this.showFilms = !this.showFilms;
  }

  onLanguage(lng) {
    this.wikipedia(lng);
  }

  afterStoreWiki() {
    this.refresh = '?' + new Date();
    this.wiki.imgurl = null;
  }

  useWikiPictureUrl(url: string) {
    this.director = {
      ...this.director,
      ImageUrl: url
    };
  }

  storeWikiPicture(url: string) {
    this.moviesService.storeWikiDirectorImage(url, this.director.id).subscribe(
      () => this.afterStoreWiki()
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
    const name = this.director.Voornaam + ' ' + this.director.Achternaam;
    this.booksService.wikiAuthor(name, lng).subscribe(
      result => this.afterWikipedia(result),
      () => console.log('Geen wiki-gegevens voor taal: ' + lng)
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

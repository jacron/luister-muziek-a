import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Movie} from '../../../../classes/movies/Movie';
import {environment} from '../../../../../environments/environment';
import {Router} from '@angular/router';
import {MoviesService} from '../../services/movies.service';
import {MenuOption} from '../../../../classes/shared/MenuOption';

@Component({
  selector: 'app-movie-menu',
  templateUrl: './movie-menu.component.html',
  styleUrls: ['./movie-menu.component.scss']
})
export class MovieMenuComponent implements OnInit {
  @Input() movie: Movie;
  @Input() unwatch: boolean;
  @Output() unwatchChange = new EventEmitter();
  options: MenuOption[] = [
    {
      label: 'Play (vlc)',
      icon: 'play_arrow',
      action: this.play.bind(this)
    },
    {
      label: 'Finder',
      icon: 'search',
      action: this.openFinder.bind(this),
    },
    {
      label: 'divider',
      icon: '',
    },
    {
      label: 'IMDb',
      icon: 'movie',
      color: 'rgb(245, 197, 24)',
      action: this.toImdb.bind(this)
    },
    {
      label: 'Afbeelding van IMDb',
      icon: 'image',
      action: this.getImage.bind(this)
    },
    {
      label: 'Plak url afbeelding',
      icon: 'image',
      color: '#55ee33',
      action: this.pasteImage.bind(this)
    },
    {
      label: 'Uit kijklijst',
      icon: 'clear',
      action: this.setUnwatch.bind(this)
    },
  ];
  constructor(
    private router: Router,
    private moviesService: MoviesService,
  ) {
  }

  act(f: Function) {
    f();
  }

  openFinder() {
    this.moviesService.openFinder(this.movie.ID).subscribe();
  }

  private updateImageUrl(result) {
    if (result.status === 200) {
      this.movie.ImageUrl = result.ImageUrl;
    } else {
      console.log(result);
    }
  }

  getImage() {
    if (confirm('Afbeelding vervangen voor ' + this.movie.DisplayTitle + '?')) {
      this.moviesService.addImage(this.movie.imdb_id).subscribe(
        result => this.updateImageUrl(result)
      );
    }
  }

  pasteImage() {
    this.moviesService.pasteImage(this.movie.imdb_id).subscribe(
      result => this.updateImageUrl(result)
    );
  }

  afterPlay(response) {
    console.log(response);
    if (response.status !== 200) {
      alert(response.message);
    }
  }

  play() {
    this.moviesService.play(this.movie.ID, 'vlc').subscribe(
      response => this.afterPlay(response)
    );
  }

  toImdb() {
    window.open(environment.imdbTitle + this.movie.imdb_id);
  }

  setUnwatch() {
    this.unwatchChange.emit(this.movie.ID);
  }

  ngOnInit() {
  }

}

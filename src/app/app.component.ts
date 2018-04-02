import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MusicService} from './music.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Luister Muziek A';
  prouter;

  constructor(
    private musicService: MusicService,
    private router: Router
  ) {
    this.prouter = router;
  }

  play(cmd) {
    this.musicService.controlPlayer(cmd).subscribe();
  }

  search() {
    console.log('search');
  }
}

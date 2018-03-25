import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Luister Muziek A';
  prouter;

  constructor(
    private router: Router
  ) {
    this.prouter = router;
  }

  search() {
    console.log('search');
  }
}

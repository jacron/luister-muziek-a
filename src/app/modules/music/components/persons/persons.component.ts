import {Component, Input, OnInit} from '@angular/core';
import {Person} from '../../../../classes/music/Person';
import {Router} from '@angular/router';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {
  @Input() persons: Person[];
  @Input() startletter: string;
  @Input() idname: string;

  constructor(
    private router: Router,
  ) { }

  toSearch(id) {
    const params = {};
    params[this.idname] = id;
    this.router.navigate(['/search', params]).then();
  }

  ngOnInit() {
  }

}

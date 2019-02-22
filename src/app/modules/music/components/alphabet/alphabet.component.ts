import {Component, EventEmitter, OnInit, Output} from '@angular/core';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.scss']
})
export class AlphabetComponent implements OnInit {
  @Output() select: EventEmitter<string> = new EventEmitter();
  letters: string[];
  selectedLetter = '';

  constructor() { }

  selectLetter(letter) {
    this.selectedLetter = letter;
    this.select.emit(letter);
  }

  ngOnInit() {
    this.letters = alphabet.split('');
  }

}

import { Injectable } from '@angular/core';
import {Choice} from '../classes/Choice';
import {StorageService} from './storage.service';

const choices: Choice[] = [
  {
    name: 'composer',
    visible: true,
    label: 'Componist',
    displayfield: 'FullName',
    id: '',
    items: [],
  },
  {
    name: 'performer',
    visible: true,
    label: 'Performer',
    displayfield: 'FullName',
    id: '',
    items: [],
  },
  {
    name: 'collection',
    visible: true,
    label: 'Collectie',
    displayfield: 'Title',
    id: '',
    items: [],
  },
  {
    name: 'tag',
    visible: true,
    label: 'Tag',
    displayfield: 'Name',
    id: '',
    items: [],
  },
  {
    name: 'instrument',
    visible: true,
    label: 'Instrument',
    displayfield: 'Name',
    id: '',
    items: [],
  },
];

@Injectable()
export class ChoiceService {

  constructor(
  ) { }

  getChoices() {
    return choices;
  }
}

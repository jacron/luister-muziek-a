import { Injectable } from '@angular/core';
import {Choice} from '../classes/Choice';
// import {Facet} from '../classes/Facet';

const choices: Choice[] = [
  {
    name: 'composer',
    visible: true,
    label: 'Componist',
    displayfield: 'FullName',
    id: -1,
    items: [],
  },
  {
    name: 'performer',
    visible: true,
    label: 'Performer',
    displayfield: 'FullName',
    id: -1,
    items: [],
  },
  {
    name: 'collection',
    visible: true,
    label: 'Collectie',
    displayfield: 'Title',
    id: -1,
    items: [],
  },
  {
    name: 'tag',
    visible: true,
    label: 'Tag',
    displayfield: 'Name',
    id: -1,
    items: [],
  },
  {
    name: 'instrument',
    visible: true,
    label: 'Instrument',
    displayfield: 'Name',
    id: -1,
    items: [],
  },
];

const facets: any = {
  composer: {
    rank: 1,
    name: 'Componist',
    icon: 'person',
    value: 'composer',
    color: '#eedddd',
    displayField: 'FullName',
    idfield: 'idcomp',
  },
  performer: {
    rank: 2,
    name: 'Performer',
    icon: 'person',
    value: 'performer',
    color: '#ddeedd',
    displayField: 'FullName',
    idfield: 'idperf',
  },
  instrument: {
    rank: 4,
    name: 'Instrument',
    icon: 'mic_none',
    value: 'instrument',
    color: '#eeeeff',
    displayField: 'Name',
    idfield: 'idinstrument',
  },
  tag: {
    rank: 5,
    name: 'Tag',
    icon: 'person',
    value: 'tag',
    color: '#efefef',
    displayField: 'Name',
    idfield: 'idtag',
  },
  collectie: {
    rank: 7,
    name: 'Collectie',
    icon: 'library_books',
    value: 'collection',
    color: '',
    displayField: 'Title',
    idfield: 'idperf',
  },
  title: {
    rank: 8,
    name: 'Titel',
    icon: 'search',
    value: 'title',
    color: '',
    displayField: 'FullName',
    idfield: 'idperf',
  },
};


@Injectable()
export class ChoiceService {

  constructor(
  ) { }

  getChoices(): Choice[] {
    return choices;
  }

  getFacets(): any {
    return facets;
  }
}

export class Director {
  id: number;
  Achternaam: string;
  Voornaam: string;
  ImageUrl: string;
  imdb_id?: string;
  Geboortejaar: string;
  Sterfjaar: string;
  Land: string;
  name?: string;
  deleted?: boolean;
  nfilms?: number;

  constructor(director) {
    for (let prop in director) {
      if (director.hasOwnProperty(prop)) {
        this[prop] = director[prop];
      }
    }
  }

  fullName?() {
    return this.Voornaam + ' ' + this.Achternaam;
  }
}

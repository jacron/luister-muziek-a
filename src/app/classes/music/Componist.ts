export class Componist {
  FullName: string;
  ID: string;
  FirstName: string;
  LastName: string;
  Birth: string;
  Death: string;
  Genre: string;
  Country: string;

  constructor(componist) {
    for (let prop in componist) {
      if (componist.hasOwnProperty(prop)) {
        this[prop] = componist[prop];
      }
    }
  }

  fullName?() {
    return this.FirstName + ' ' + this.LastName;
  };
}

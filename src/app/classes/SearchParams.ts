export class SearchParams {
  constructor(params) {
    this.idperf = +params.idperf;
    this.idcomp = +params.idcomp;
    this.idtag = +params.idtag;
    this.idcoll = +params.idcoll;
  }
  idcomp: number;
  idperf: number;
  idcoll: number;
  idtag: number;
}

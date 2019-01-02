import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {List} from '../../../../classes/List';
import {Album} from '../../../../classes/Album';

@Component({
  selector: 'app-album-header',
  templateUrl: './album-header.component.html',
  styleUrls: ['./album-header.component.scss']
})
export class AlbumHeaderComponent implements OnInit {

  @Input() list: List;
  @Input() album: Album;
  @Input() navBackwards;
  @Input() navForwards;

  @Output() toList = new EventEmitter();
  @Output() back = new EventEmitter();
  @Output() forward = new EventEmitter();
  @Output() reload = new EventEmitter();

  emitToList() {
    this.toList.emit();
  }

  emitBack() {
    this.back.emit();
  }

  emitForward() {
    this.forward.emit();
  }

  emitReload(result) {
    this.reload.emit(result);
  }

  constructor() { }

  ngOnInit() {
  }

}

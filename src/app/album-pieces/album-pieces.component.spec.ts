import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumPiecesComponent } from './album-pieces.component';

describe('AlbumPiecesComponent', () => {
  let component: AlbumPiecesComponent;
  let fixture: ComponentFixture<AlbumPiecesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumPiecesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumPiecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

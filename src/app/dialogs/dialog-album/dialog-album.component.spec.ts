import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAlbumComponent } from './dialog-album.component';

describe('DialogAlbumComponent', () => {
  let component: DialogAlbumComponent;
  let fixture: ComponentFixture<DialogAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumThumbComponent } from './album-thumb.component';

describe('AlbumThumbComponent', () => {
  let component: AlbumThumbComponent;
  let fixture: ComponentFixture<AlbumThumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumThumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

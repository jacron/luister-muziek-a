import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumMetatagsComponent } from './album-metatags.component';

describe('AlbumMetatagsComponent', () => {
  let component: AlbumMetatagsComponent;
  let fixture: ComponentFixture<AlbumMetatagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumMetatagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumMetatagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

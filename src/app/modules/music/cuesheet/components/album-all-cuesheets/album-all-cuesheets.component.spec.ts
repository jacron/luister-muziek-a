import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumAllCuesheetsComponent } from './album-all-cuesheets.component';

describe('AlbumAllCuesheetsComponent', () => {
  let component: AlbumAllCuesheetsComponent;
  let fixture: ComponentFixture<AlbumAllCuesheetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumAllCuesheetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumAllCuesheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

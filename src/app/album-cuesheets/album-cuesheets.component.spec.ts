import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumCuesheetsComponent } from './album-cuesheets.component';

describe('AlbumCuesheetsComponent', () => {
  let component: AlbumCuesheetsComponent;
  let fixture: ComponentFixture<AlbumCuesheetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumCuesheetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumCuesheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

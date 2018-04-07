import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumPersonsComponent } from './album-persons.component';

describe('AlbumPersonsComponent', () => {
  let component: AlbumPersonsComponent;
  let fixture: ComponentFixture<AlbumPersonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumPersonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

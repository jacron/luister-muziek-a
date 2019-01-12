import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesNewFromImdbComponent } from './movies-new-from-imdb.component';

describe('MoviesNewFromImdbComponent', () => {
  let component: MoviesNewFromImdbComponent;
  let fixture: ComponentFixture<MoviesNewFromImdbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesNewFromImdbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesNewFromImdbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesRecentlyPlayedComponent } from './movies-recently-played.component';

describe('MoviesRecentlyPlayedComponent', () => {
  let component: MoviesRecentlyPlayedComponent;
  let fixture: ComponentFixture<MoviesRecentlyPlayedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesRecentlyPlayedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesRecentlyPlayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

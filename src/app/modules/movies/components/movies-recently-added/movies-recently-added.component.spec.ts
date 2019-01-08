import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesRecentlyAddedComponent } from './movies-recently-added.component';

describe('MoviesRecentlyAddedComponent', () => {
  let component: MoviesRecentlyAddedComponent;
  let fixture: ComponentFixture<MoviesRecentlyAddedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesRecentlyAddedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesRecentlyAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

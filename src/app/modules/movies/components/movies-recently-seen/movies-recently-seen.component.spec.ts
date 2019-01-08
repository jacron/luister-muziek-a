import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesRecentlySeenComponent } from './movies-recently-seen.component';

describe('MoviesRecentlySeenComponent', () => {
  let component: MoviesRecentlySeenComponent;
  let fixture: ComponentFixture<MoviesRecentlySeenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesRecentlySeenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesRecentlySeenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

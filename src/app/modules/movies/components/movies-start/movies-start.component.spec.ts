import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesStartComponent } from './movies-start.component';

describe('MoviesStartComponent', () => {
  let component: MoviesStartComponent;
  let fixture: ComponentFixture<MoviesStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

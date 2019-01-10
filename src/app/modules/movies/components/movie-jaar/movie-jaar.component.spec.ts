import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieJaarComponent } from './movie-jaar.component';

describe('MovieJaarComponent', () => {
  let component: MovieJaarComponent;
  let fixture: ComponentFixture<MovieJaarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieJaarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieJaarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

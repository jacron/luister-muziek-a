import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorFilmsListComponent } from './director-films-list.component';

describe('DirectorFilmsListComponent', () => {
  let component: DirectorFilmsListComponent;
  let fixture: ComponentFixture<DirectorFilmsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorFilmsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorFilmsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

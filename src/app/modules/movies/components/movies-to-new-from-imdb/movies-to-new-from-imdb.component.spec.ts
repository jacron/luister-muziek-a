import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesToNewFromImdbComponent } from './movies-to-new-from-imdb.component';

describe('MoviesToNewFromImdbComponent', () => {
  let component: MoviesToNewFromImdbComponent;
  let fixture: ComponentFixture<MoviesToNewFromImdbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesToNewFromImdbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesToNewFromImdbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

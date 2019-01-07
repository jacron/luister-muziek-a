import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorAutocompleteComponent } from './director-autocomplete.component';

describe('DirectorAutocompleteComponent', () => {
  let component: DirectorAutocompleteComponent;
  let fixture: ComponentFixture<DirectorAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

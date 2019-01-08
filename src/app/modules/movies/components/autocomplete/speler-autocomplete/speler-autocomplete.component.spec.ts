import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpelerAutocompleteComponent } from './speler-autocomplete.component';

describe('SpelerAutocompleteComponent', () => {
  let component: SpelerAutocompleteComponent;
  let fixture: ComponentFixture<SpelerAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpelerAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpelerAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

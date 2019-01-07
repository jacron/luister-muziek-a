import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleAutocompleteComponent } from './title-autocomplete.component';

describe('TitleAutocompleteComponent', () => {
  let component: TitleAutocompleteComponent;
  let fixture: ComponentFixture<TitleAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

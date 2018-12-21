import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCustomizeSearchComponent } from './dialog-customize-search.component';

describe('DialogCustomizeSearchComponent', () => {
  let component: DialogCustomizeSearchComponent;
  let fixture: ComponentFixture<DialogCustomizeSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCustomizeSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCustomizeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

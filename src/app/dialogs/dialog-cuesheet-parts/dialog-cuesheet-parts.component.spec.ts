import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCuesheetPartsComponent } from './dialog-cuesheet-parts.component';

describe('DialogCuesheetPartsComponent', () => {
  let component: DialogCuesheetPartsComponent;
  let fixture: ComponentFixture<DialogCuesheetPartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCuesheetPartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCuesheetPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

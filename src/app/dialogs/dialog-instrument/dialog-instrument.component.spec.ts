import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInstrumentComponent } from './dialog-instrument.component';

describe('DialogInstrumentComponent', () => {
  let component: DialogInstrumentComponent;
  let fixture: ComponentFixture<DialogInstrumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogInstrumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogInstrumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

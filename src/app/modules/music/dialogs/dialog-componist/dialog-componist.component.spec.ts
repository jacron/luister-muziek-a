import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponistComponent } from './dialog-componist.component';

describe('DialogComponistComponent', () => {
  let component: DialogComponistComponent;
  let fixture: ComponentFixture<DialogComponistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogComponistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

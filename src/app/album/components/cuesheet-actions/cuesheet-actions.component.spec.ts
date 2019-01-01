import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuesheetActionsComponent } from './cuesheet-actions.component';

describe('CuesheetActionsComponent', () => {
  let component: CuesheetActionsComponent;
  let fixture: ComponentFixture<CuesheetActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuesheetActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuesheetActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

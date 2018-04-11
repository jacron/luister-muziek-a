import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuesheetMenuComponent } from './cuesheet-menu.component';

describe('CuesheetMenuComponent', () => {
  let component: CuesheetMenuComponent;
  let fixture: ComponentFixture<CuesheetMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuesheetMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuesheetMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

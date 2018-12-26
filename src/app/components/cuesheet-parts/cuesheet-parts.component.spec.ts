import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuesheetPartsComponent } from './cuesheet-parts.component';

describe('CuesheetPartsComponent', () => {
  let component: CuesheetPartsComponent;
  let fixture: ComponentFixture<CuesheetPartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuesheetPartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuesheetPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

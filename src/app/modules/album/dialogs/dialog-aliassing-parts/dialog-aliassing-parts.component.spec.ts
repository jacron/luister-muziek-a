import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAliassingPartsComponent } from './dialog-aliassing-parts.component';

describe('DialogAliassingPartsComponent', () => {
  let component: DialogAliassingPartsComponent;
  let fixture: ComponentFixture<DialogAliassingPartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAliassingPartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAliassingPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

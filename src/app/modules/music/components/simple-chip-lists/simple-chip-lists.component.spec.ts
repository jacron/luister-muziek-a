import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleChipListsComponent } from './simple-chip-lists.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('SimpleChipListsComponent', () => {
  let component: SimpleChipListsComponent;
  let fixture: ComponentFixture<SimpleChipListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleChipListsComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleChipListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

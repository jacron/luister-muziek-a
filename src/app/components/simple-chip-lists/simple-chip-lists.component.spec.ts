import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleChipListsComponent } from './simple-chip-lists.component';

describe('SimpleChipListsComponent', () => {
  let component: SimpleChipListsComponent;
  let fixture: ComponentFixture<SimpleChipListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleChipListsComponent ]
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

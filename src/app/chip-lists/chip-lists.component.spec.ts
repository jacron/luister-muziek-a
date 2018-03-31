import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipListsComponent } from './chip-lists.component';

describe('ChipListsComponent', () => {
  let component: ChipListsComponent;
  let fixture: ComponentFixture<ChipListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

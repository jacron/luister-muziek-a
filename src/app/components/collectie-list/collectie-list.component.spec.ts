import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectieListComponent } from './collectie-list.component';

describe('CollectieListComponent', () => {
  let component: CollectieListComponent;
  let fixture: ComponentFixture<CollectieListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectieListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

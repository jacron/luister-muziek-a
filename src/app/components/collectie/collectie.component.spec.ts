import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectieComponent } from './collectie.component';

describe('CollectieComponent', () => {
  let component: CollectieComponent;
  let fixture: ComponentFixture<CollectieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

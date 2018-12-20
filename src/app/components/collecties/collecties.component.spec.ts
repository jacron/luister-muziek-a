import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectiesComponent } from './collecties.component';

describe('CollectiesComponent', () => {
  let component: CollectiesComponent;
  let fixture: ComponentFixture<CollectiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

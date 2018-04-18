import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveWeerComponent } from './live-weer.component';

describe('LiveWeerComponent', () => {
  let component: LiveWeerComponent;
  let fixture: ComponentFixture<LiveWeerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveWeerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveWeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

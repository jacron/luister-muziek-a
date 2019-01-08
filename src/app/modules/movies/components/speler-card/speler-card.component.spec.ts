import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpelerCardComponent } from './speler-card.component';

describe('SpelerCardComponent', () => {
  let component: SpelerCardComponent;
  let fixture: ComponentFixture<SpelerCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpelerCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpelerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

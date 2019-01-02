import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeChipsComponent } from './home-chips.component';

describe('HomeChipsComponent', () => {
  let component: HomeChipsComponent;
  let fixture: ComponentFixture<HomeChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

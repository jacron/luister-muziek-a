import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponistEditCardComponent } from './componist-edit-card.component';

describe('ComponistEditCardComponent', () => {
  let component: ComponistEditCardComponent;
  let fixture: ComponentFixture<ComponistEditCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponistEditCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponistEditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

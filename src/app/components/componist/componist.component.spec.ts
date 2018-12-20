import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponistComponent } from './componist.component';

describe('ComponistComponent', () => {
  let component: ComponistComponent;
  let fixture: ComponentFixture<ComponistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

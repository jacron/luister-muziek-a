import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponistListComponent } from './componist-list.component';

describe('ComponistListComponent', () => {
  let component: ComponistListComponent;
  let fixture: ComponentFixture<ComponistListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponistListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

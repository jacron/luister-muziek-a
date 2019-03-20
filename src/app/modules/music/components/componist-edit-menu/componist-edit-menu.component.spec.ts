import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponistEditMenuComponent } from './componist-edit-menu.component';

describe('ComponistEditMenuComponent', () => {
  let component: ComponistEditMenuComponent;
  let fixture: ComponentFixture<ComponistEditMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponistEditMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponistEditMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

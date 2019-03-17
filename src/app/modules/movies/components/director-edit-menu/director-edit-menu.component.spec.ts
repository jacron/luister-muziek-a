import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorEditMenuComponent } from './director-edit-menu.component';

describe('DirectorEditMenuComponent', () => {
  let component: DirectorEditMenuComponent;
  let fixture: ComponentFixture<DirectorEditMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorEditMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorEditMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

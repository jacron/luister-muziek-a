import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorEditMenuComponent } from './author-edit-menu.component';

describe('AuthorEditMenuComponent', () => {
  let component: AuthorEditMenuComponent;
  let fixture: ComponentFixture<AuthorEditMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorEditMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorEditMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

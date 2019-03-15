import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorEditCardComponent } from './author-edit-card.component';

describe('AuthorEditCardComponent', () => {
  let component: AuthorEditCardComponent;
  let fixture: ComponentFixture<AuthorEditCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorEditCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorEditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

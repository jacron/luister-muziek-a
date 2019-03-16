import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorBooksListComponent } from './author-books-list.component';

describe('AuthorBooksListComponent', () => {
  let component: AuthorBooksListComponent;
  let fixture: ComponentFixture<AuthorBooksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorBooksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorBooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

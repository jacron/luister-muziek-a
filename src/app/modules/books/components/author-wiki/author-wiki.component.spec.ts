import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorWikiComponent } from './author-wiki.component';

describe('AuthorWikiComponent', () => {
  let component: AuthorWikiComponent;
  let fixture: ComponentFixture<AuthorWikiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorWikiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorWikiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

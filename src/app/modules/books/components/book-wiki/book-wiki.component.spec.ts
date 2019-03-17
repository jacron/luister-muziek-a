import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookWikiComponent } from './book-wiki.component';

describe('BookWikiComponent', () => {
  let component: BookWikiComponent;
  let fixture: ComponentFixture<BookWikiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookWikiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookWikiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

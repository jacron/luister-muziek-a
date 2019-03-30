import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRemoteComponent } from './book-remote.component';

describe('BookRemoteComponent', () => {
  let component: BookRemoteComponent;
  let fixture: ComponentFixture<BookRemoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookRemoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookRemoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

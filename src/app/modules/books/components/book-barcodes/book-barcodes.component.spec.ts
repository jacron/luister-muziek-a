import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookBarcodesComponent } from './book-barcodes.component';

describe('BookBarcodesComponent', () => {
  let component: BookBarcodesComponent;
  let fixture: ComponentFixture<BookBarcodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookBarcodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookBarcodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

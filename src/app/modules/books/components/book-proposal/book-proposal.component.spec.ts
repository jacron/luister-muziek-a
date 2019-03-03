import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookProposalComponent } from './book-proposal.component';

describe('BookProposalComponent', () => {
  let component: BookProposalComponent;
  let fixture: ComponentFixture<BookProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

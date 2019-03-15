import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAuthorComponent } from './dialog-author.component';

describe('DialogAuthorComponent', () => {
  let component: DialogAuthorComponent;
  let fixture: ComponentFixture<DialogAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

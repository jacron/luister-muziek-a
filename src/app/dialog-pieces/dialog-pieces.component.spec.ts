import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPiecesComponent } from './dialog-pieces.component';

describe('DialogPiecesComponent', () => {
  let component: DialogPiecesComponent;
  let fixture: ComponentFixture<DialogPiecesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPiecesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPiecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

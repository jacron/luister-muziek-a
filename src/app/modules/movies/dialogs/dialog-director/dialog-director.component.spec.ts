import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDirectorComponent } from './dialog-director.component';

describe('DialogDirectorComponent', () => {
  let component: DialogDirectorComponent;
  let fixture: ComponentFixture<DialogDirectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDirectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleQueryComponent } from './title-query.component';

describe('TitleQueryComponent', () => {
  let component: TitleQueryComponent;
  let fixture: ComponentFixture<TitleQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

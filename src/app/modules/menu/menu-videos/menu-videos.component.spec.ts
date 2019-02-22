import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuVideosComponent } from './menu-videos.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('MenuVideosComponent', () => {
  let component: MenuVideosComponent;
  let fixture: ComponentFixture<MenuVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuVideosComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

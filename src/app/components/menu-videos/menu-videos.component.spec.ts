import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuVideosComponent } from './menu-videos.component';

describe('MenuVideosComponent', () => {
  let component: MenuVideosComponent;
  let fixture: ComponentFixture<MenuVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuVideosComponent ]
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

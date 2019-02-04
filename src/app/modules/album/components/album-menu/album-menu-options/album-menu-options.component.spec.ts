import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumMenuOptionsComponent } from './album-menu-options.component';

describe('AlbumMenuOptionsComponent', () => {
  let component: AlbumMenuOptionsComponent;
  let fixture: ComponentFixture<AlbumMenuOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumMenuOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumMenuOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

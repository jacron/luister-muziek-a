import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWikiComponent } from './item-wiki.component';

describe('ItemWikiComponent', () => {
  let component: ItemWikiComponent;
  let fixture: ComponentFixture<ItemWikiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemWikiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemWikiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

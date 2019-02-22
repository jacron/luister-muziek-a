import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsComponent } from './tags.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MockPipe} from '../../../../../test-helpers/mock-pipe';

describe('TagsComponent', () => {
  let component: TagsComponent;
  let fixture: ComponentFixture<TagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TagsComponent,
        MockPipe,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

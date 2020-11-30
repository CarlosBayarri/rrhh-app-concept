import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedBookmarksComponent } from './feed-bookmarks.component';

describe('FeedBookmarksComponent', () => {
  let component: FeedBookmarksComponent;
  let fixture: ComponentFixture<FeedBookmarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedBookmarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedBookmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

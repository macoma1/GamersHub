import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularNewGamesComponent } from './popular-new-games.component';

describe('PopularNewGamesComponent', () => {
  let component: PopularNewGamesComponent;
  let fixture: ComponentFixture<PopularNewGamesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopularNewGamesComponent]
    });
    fixture = TestBed.createComponent(PopularNewGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

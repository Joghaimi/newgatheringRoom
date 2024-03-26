import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextRoomComponent } from './next-room.component';

describe('NextRoomComponent', () => {
  let component: NextRoomComponent;
  let fixture: ComponentFixture<NextRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NextRoomComponent]
    });
    fixture = TestBed.createComponent(NextRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

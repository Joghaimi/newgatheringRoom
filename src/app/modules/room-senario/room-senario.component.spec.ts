import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomSenarioComponent } from './room-senario.component';

describe('RoomSenarioComponent', () => {
  let component: RoomSenarioComponent;
  let fixture: ComponentFixture<RoomSenarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomSenarioComponent]
    });
    fixture = TestBed.createComponent(RoomSenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

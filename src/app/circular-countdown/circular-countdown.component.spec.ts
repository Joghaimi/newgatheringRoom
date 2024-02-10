import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularCountdownComponent } from './circular-countdown.component';

describe('CircularCountdownComponent', () => {
  let component: CircularCountdownComponent;
  let fixture: ComponentFixture<CircularCountdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CircularCountdownComponent]
    });
    fixture = TestBed.createComponent(CircularCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

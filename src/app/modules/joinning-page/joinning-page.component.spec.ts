import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinningPageComponent } from './joinning-page.component';

describe('JoinningPageComponent', () => {
  let component: JoinningPageComponent;
  let fixture: ComponentFixture<JoinningPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoinningPageComponent]
    });
    fixture = TestBed.createComponent(JoinningPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

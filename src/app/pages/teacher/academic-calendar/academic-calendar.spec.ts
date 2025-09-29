import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicCalendar } from './academic-calendar';

describe('AcademicCalendar', () => {
  let component: AcademicCalendar;
  let fixture: ComponentFixture<AcademicCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicCalendar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicCalendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

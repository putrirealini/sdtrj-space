import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalAcademicCalendar } from './principal-academic-calendar';

describe('PrincipalAcademicCalendar', () => {
  let component: PrincipalAcademicCalendar;
  let fixture: ComponentFixture<PrincipalAcademicCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalAcademicCalendar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalAcademicCalendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

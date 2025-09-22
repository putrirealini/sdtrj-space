import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalAcademicCalendarComponent } from './principal-academic-calendar';

describe('PrincipalAcademicCalendarComponent', () => {
  let component: PrincipalAcademicCalendarComponent;
  let fixture: ComponentFixture<PrincipalAcademicCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalAcademicCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalAcademicCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

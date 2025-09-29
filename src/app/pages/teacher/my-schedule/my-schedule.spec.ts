import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySchedule } from './my-schedule';

describe('MySchedule', () => {
  let component: MySchedule;
  let fixture: ComponentFixture<MySchedule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MySchedule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySchedule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersFolderComponent } from './teachers-folder';

describe('TeachersFolder', () => {
  let component: TeachersFolderComponent;
  let fixture: ComponentFixture<TeachersFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeachersFolderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeachersFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

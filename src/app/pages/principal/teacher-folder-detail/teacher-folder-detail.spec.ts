import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherFolderDetailComponent } from './teacher-folder-detail';

describe('TeacherFolderDetailComponent', () => {
  let component: TeacherFolderDetailComponent;
  let fixture: ComponentFixture<TeacherFolderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherFolderDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherFolderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

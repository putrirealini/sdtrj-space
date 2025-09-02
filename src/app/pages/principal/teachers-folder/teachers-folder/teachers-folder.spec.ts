import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersFolder } from './teachers-folder';

describe('TeachersFolder', () => {
  let component: TeachersFolder;
  let fixture: ComponentFixture<TeachersFolder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeachersFolder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeachersFolder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

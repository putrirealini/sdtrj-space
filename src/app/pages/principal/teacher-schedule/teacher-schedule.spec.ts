import { ComponentFixture, TestBed } from '@angular/core/testing';

// DIUBAH: Mengimpor nama class yang benar
import { TeacherScheduleComponent } from './teacher-schedule';

// DIUBAH: Menggunakan nama yang benar
describe('TeacherScheduleComponent', () => { 
  // DIUBAH: Menggunakan tipe data yang benar
  let component: TeacherScheduleComponent;
  let fixture: ComponentFixture<TeacherScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // DIUBAH: Mengimpor komponen yang benar
      imports: [TeacherScheduleComponent]
    })
    .compileComponents();

    // DIUBAH: Membuat komponen yang benar
    fixture = TestBed.createComponent(TeacherScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
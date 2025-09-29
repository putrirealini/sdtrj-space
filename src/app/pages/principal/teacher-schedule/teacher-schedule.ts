import { Component, OnInit } from '@angular/core';
import { TeacherScheduleService } from '../../../services/principal/teacher-schedule.service.js';
import { CommonModule } from '@angular/common';
import { AddScheduleModalComponent } from '../add-schedule-modal/add-schedule-modal.js';

@Component({
  selector: 'app-teacher-schedule',
  standalone: true,
  imports: [
    CommonModule,
    AddScheduleModalComponent
  ],
  templateUrl: './teacher-schedule.html',
  styleUrls: ['./teacher-schedule.css']
})
export class TeacherScheduleComponent implements OnInit {
  teachers: any[] = [];
  scheduleData: any[] = [];
  selectedTeacherId: string | null = null;  // simpan teacher yg dipilih
  isModalOpen = false;

  constructor(private teacherScheduleService: TeacherScheduleService) {}

  ngOnInit(): void {
    // sementara dummy, nanti bisa fetch dari API /teachers

    this.teacherScheduleService.getAllTeacher().subscribe((res: any) => {
      console.log('res', res)
      if (res.success) {
        this.teachers = res.data;
      }
    })
  }

  onTeacherChange(event: Event) {
    const teacherId = (event.target as HTMLSelectElement).value;
    this.selectedTeacherId = teacherId;

    if (!teacherId) {
      this.scheduleData = []; // kosongkan jadwal kalau belum pilih guru
      return;
    }

    this.teacherScheduleService.getScheduleByTeacher(teacherId).subscribe((res: any) => {
      if (res.success) {
        this.scheduleData = this.mapSchedule(res.data);
      }
    });
  }

  private toRoman(num: number): string {
    const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
    return romans[num - 1] || num.toString();
  }

  mapSchedule(apiData: any): any[] {
    const timePeriods = apiData.timePeriods;
    const schedules = apiData.schedules;

    const result: any[] = [];

    Object.keys(timePeriods).forEach((key, index) => {
      const time = timePeriods[key];
      if (key.includes('recess')) {
        const recessNum = parseInt(key.replace('recess', ''), 10);
        result.push({
          period: null,
          time,
          activity: `RECESS ${this.toRoman(recessNum)}`
        });
      } else {
        result.push({
          period: index + 1,
          time,
          monday: schedules.monday.find((s: any) => s.period === key)?.subject || '',
          tuesday: schedules.tuesday.find((s: any) => s.period === key)?.subject || '',
          wednesday: schedules.wednesday.find((s: any) => s.period === key)?.subject || '',
          thursday: schedules.thursday.find((s: any) => s.period === key)?.subject || '',
          friday: schedules.friday.find((s: any) => s.period === key)?.subject || ''
        });
      }
    });

    return result;
  }

  openAddScheduleModal() {
    this.isModalOpen = true;
  }

  closeAddScheduleModal() {
    this.isModalOpen = false;
  }

  downloadSchedule() {
    if (!this.selectedTeacherId) {
      alert('Please select a teacher first.');
      return;
    }

    this.teacherScheduleService.downloadSchedule(this.selectedTeacherId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `schedule-${this.selectedTeacherId}.csv`; // ubah ke CSV
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => {
        alert('Failed to download schedule.');
      }
    });
  }

  uploadSchedule() {
    if (!confirm('Are you sure you want to upload and publish the schedule? This will overwrite existing schedules.')) {
      return;
    }

    this.teacherScheduleService.uploadSchedule().subscribe({
      next: () => {
        alert('Schedule uploaded successfully.');
        if (this.selectedTeacherId) {
          this.onTeacherChange({ target: { value: this.selectedTeacherId } } as any);
        }
      },
      error: () => {
        alert('Failed to upload schedule.');
      }
    });
  }
}

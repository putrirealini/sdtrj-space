import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddScheduleService, Schedule } from '../../../services/principal/add-schedule.service';

@Component({
  selector: 'app-add-schedule-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-schedule-modal.html',
  styleUrls: ['./add-schedule-modal.css']
})
export class AddScheduleModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  teachers: any[] = [];

  schedule: Schedule = {
    teacherId: '',
    day: '',
    period: '',
    subject: '',
    class: ''
  };

  constructor(private addScheduleService: AddScheduleService) {}

  ngOnInit(): void {
    this.addScheduleService.getAllTeachers().subscribe({
      next: (res: any) => {
        console.log('res', res);
        if (res.success && Array.isArray(res.data)) {
          this.teachers = res.data;
        }
      },
      error: (err) => {
        console.error('Error fetching teachers:', err);
      }
    });
  }

  closeModal(): void {
    this.close.emit();
  }

  saveSchedule(): void {
    if (!this.schedule.teacherId || !this.schedule.day || !this.schedule.period || !this.schedule.subject || !this.schedule.class) {
      alert('Please fill all fields');
      return;
    }

    this.addScheduleService.createSchedule(this.schedule).subscribe({
      next: (res) => {
        this.closeModal();
        alert('Schedule saved successfully');
      },
      error: (err) => {
        console.error('Error saving schedule:', err);
        alert('Failed to save schedule');
      }
    });
  }
}

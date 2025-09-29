import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademicCalendarService } from '../../../services/teacher/academic-calendar.service';

@Component({
  selector: 'app-academic-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './academic-calendar.html',
  styleUrl: './academic-calendar.css'
})
export class AcademicCalendar implements OnInit {
   imageUrl: string = '';

  constructor(private academicCalendarService: AcademicCalendarService) { }

  ngOnInit(): void {
    this.loadAcademicCalendar();
  }

  loadAcademicCalendar(): void {
    this.academicCalendarService.getAnnouncements().subscribe({
      next: (response) => {
        console.log('res : ', response.data)
        if (response && response.data) {
          // Asumsikan hanya ada satu kalender akademik terbaru
          const latestCalendar = response.data;
          this.imageUrl = latestCalendar.imageUrl; // Sesuaikan dengan properti yang sesuai dari respons API
        }
      },
      error: (error) => {
        console.error('Error loading academic calendar:', error);
      }
    });
  }
}

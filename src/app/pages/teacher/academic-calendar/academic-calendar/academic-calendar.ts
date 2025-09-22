import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-academic-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './academic-calendar.html',
  styleUrl: './academic-calendar.css'
})
export class AcademicCalendar {
   imageUrl: string = 'assets/images/kalender-akademik-2025.png';
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


interface Announcement {
  title: string;
  date: string;
  fileUrl: string;
}

interface RecentFile {
  name: string;
  date: string;
  size: string;
  fileUrl: string;
}

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teacher-dashboard.html',
  styleUrl: './teacher-dashboard.css'
})
export class TeacherDashboard {

  announcements: Announcement[] = [
    { title: 'New Student Orientation', date: '01, Jul 2025', fileUrl: 'images/sample-document.pdf' },
    { title: 'School Anniversary', date: '23, Jul 2025', fileUrl: 'images/sample-document.pdf' },
    { title: 'Sport Day', date: '30, Jul 2025', fileUrl: 'images/sample-document.pdf' },
  ];


  recentFiles: RecentFile[] = [
    { name: 'Science for grade 4.pdf', date: 'August 1, 2025', size: '900 KB', fileUrl: 'images/sample-document.pdf' },
    { name: 'Spelling practice.jpg', date: 'June 18, 2025', size: '217 KB', fileUrl: 'images/sample-document.pdf' },
    { name: 'Reading practice.jpg', date: 'July 2, 2025', size: '412 KB', fileUrl: 'images/sample-document.pdf' },
  ];
}
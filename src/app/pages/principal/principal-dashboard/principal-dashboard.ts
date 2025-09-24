import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Definisikan struktur data
interface Announcement {
  title: string;
  date: string;
}

interface TeacherFolder {
  name: string;
  title: string;
  avatarUrl: string;
}

@Component({
  selector: 'app-principal-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './principal-dashboard.html',
  styleUrl: './principal-dashboard.css'
})
export class PrincipalDashboard {
  // Data palsu untuk pengumuman
  announcements: Announcement[] = [
    { title: 'New Student Orientation', date: '01, Jul 2025' },
    { title: 'School Anniversary', date: '23, Jul 2025' },
    { title: 'Sport Day', date: '30, Jul 2025' },
  ];

  // Data palsu untuk folder guru
  teacherFolders: TeacherFolder[] = [
    { name: 'Ni Made Trisna Suryaningsih', title: 'S.Pd.', avatarUrl: 'images/avatar-icon.png' },
    { name: 'Desak Made Diah Kumara Dewi', title: 'S.Pd.', avatarUrl: 'images/avatar-icon.png' },
    { name: 'Ida Ayu Widiantari', title: 'SE', avatarUrl: 'images/avatar-icon.png' },
    { name: 'Ni Kadek Nia Sucah Yanti', title: 'S.Pd', avatarUrl: 'images/avatar-icon.png' },
    { name: 'Ni Made Ari Dwiayanti', title: 'S.Pd', avatarUrl: 'images/avatar-icon.png' },
  ];
}
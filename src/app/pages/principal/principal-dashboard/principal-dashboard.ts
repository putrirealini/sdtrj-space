import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalDashboardService } from '../../../services/principal/principal-dashboard.service';

@Component({
  selector: 'app-principal-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './principal-dashboard.html',
  styleUrl: './principal-dashboard.css'
})
export class PrincipalDashboard implements OnInit {
  announcements: any[] = [];
  teacherFolders: any[] = [];
  loading = true;

  constructor(private dashboardService: PrincipalDashboardService) {}

  ngOnInit() {
    this.dashboardService.getDashboardData().subscribe({
      next: (res: any) => {
        this.announcements = res.data.announcements;
        this.teacherFolders = res.data.recentTeacherFolders;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading dashboard', err);
        this.loading = false;
      }
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  getFileUrl(filePath: string): string {
    return `http://localhost:5000/${filePath}`; // ganti sesuai static serve
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DashboardService, Announcement, RecentFile, TodaySchedule, DashboardData } from '../../../services/teacher/dashboard.service';
import { AuthService, User } from '../../../services/auth.service';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './teacher-dashboard.html',
  styleUrl: './teacher-dashboard.css'
})
export class TeacherDashboard implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  currentUser: User | null = null;
  announcements: any[] = [];
  recentFiles: any[] = [];
  todaySchedule: any[] = [];

  // UI state
  loading = true;
  error = '';
  currentTime = new Date();

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.dashboardService.getDashboardData().subscribe({
      next: (res: any) => {
        this.announcements = res.data.announcements;
        this.recentFiles = res.data.recentFiles;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading dashboard', err);
        this.loading = false;
      }
    });
    this.startClock();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private startClock(): void {
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  // Utility methods
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  formatFileSize(bytes: number): string {
    if (!bytes) return 'Unknown';

    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }

  formatTime(timeString: string): string {
    return timeString; // Already formatted from backend
  }

  formatPeriod(period: string): string {
    return period.replace('period', 'Period ').toUpperCase();
  }

  getGreeting(): string {
    const hour = this.currentTime.getHours();
    const name = this.currentUser?.name || 'Teacher';

    if (hour < 12) {
      return `Good Morning, ${name}!`;
    } else if (hour < 17) {
      return `Good Afternoon, ${name}!`;
    } else {
      return `Good Evening, ${name}!`;
    }
  }

  getCurrentDay(): string {
    return this.currentTime.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Action methods
  downloadAnnouncement(announcement: Announcement): void {
    if (announcement.attachment) {
      const downloadUrl = this.dashboardService.downloadAnnouncementFile(announcement._id);
      window.open(downloadUrl, '_blank');
    }
  }

  openRecentFile(file: RecentFile): void {
    // For now, we'll try to open the file in a new tab
    // This might need adjustment based on your file serving setup
    const previewUrl = this.dashboardService.previewRecentFile(file.filePath);
    window.open(previewUrl, '_blank');
  }

  navigateToSchedule(): void {
    // Navigate to schedule page - implement based on your routing
    // this.router.navigate(['/teacher/schedule']);
  }

  navigateToFolders(): void {
    // Navigate to folders page - implement based on your routing
    // this.router.navigate(['/teacher/folders']);
  }

  // Helper methods for templates
  hasAnnouncements(): boolean {
    return this.announcements.length > 0;
  }

  hasTodaySchedule(): boolean {
    return this.todaySchedule.length > 0;
  }

  getNextClass(): TodaySchedule | null {
    if (!this.todaySchedule.length) return null;

    // This would need more sophisticated logic based on current time
    return this.todaySchedule[0];
  }

  getFileUrl(filePath: string): string {
    return `http://localhost:5000/${filePath}`; // ganti sesuai static serve
  }
}

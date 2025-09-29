import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Announcement {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  fileUrl: string;
  attachment?: string;
}

export interface RecentFile {
  _id: string;
  fileName: string;
  fileUrl: string;
  filePath: string;
  fileSize: number;
  updatedAt: string;
}

export interface TodaySchedule {
  _id: string;
  teacherId: string;
  teacherName: string;
  day: string;
  period: string;
  time: string;
  subject: string;
  class: string;
}

export interface DashboardData {
  role: string;
  announcements: Announcement[];
  recentFiles: RecentFile[];
  todaySchedule: TodaySchedule[];
  upcomingSchedules: TodaySchedule[];
  stats: {
    totalAnnouncements: number;
    recentFilesCount: number;
    todayClassesCount: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<{
    success: boolean;
    data?: DashboardData;
    message?: string;
  }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    });
    return this.http.get<{ success: boolean; data?: DashboardData; message?: string }>(
      `${this.apiUrl}/dashboard`,
      { headers }
    );
  }

  // helper kalau mau download file pengumuman
  downloadAnnouncementFile(announcementId: string): string {
    return `${this.apiUrl}/announcements/${announcementId}/download`;
  }

  // helper preview file (recent file)
  previewRecentFile(filePath: string): string {
    return `http://localhost:5000/${filePath}`;
  }
}

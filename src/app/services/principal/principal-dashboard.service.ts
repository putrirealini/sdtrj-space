import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Announcement {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  attachment?: {
    fileName: string;
    filePath: string;
  } | null;
}

interface TeacherFolder {
  _id: string;
  teacherName: string;
  folderType: string;
  files: {
    fileName: string;
    originalName: string;
    filePath: string;
    uploadedAt: string;
  }[];
}

interface DashboardResponse {
  success: boolean;
  data: {
    role: string;
    announcements: Announcement[];
    recentTeacherFolders: TeacherFolder[];
    recentActivities: TeacherFolder[];
    stats: {
      totalTeachers: number;
      totalSchedules: number;
      totalFolders: number;
      totalAnnouncements: number;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class PrincipalDashboardService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<DashboardResponse> {
    const token = localStorage.getItem('token'); // asumsi token disimpan di localStorage

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<DashboardResponse>(`${this.baseUrl}/dashboard`, { headers });
  }
}

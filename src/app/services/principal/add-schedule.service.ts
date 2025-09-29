import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Schedule {
  teacherId: string; // ID guru yang mengajar
  day: string;       // monday, tuesday, ...
  period: string;      // 1 - 9, atau recessI/recessII
  subject: string;   // e.g. "Math"
  class: string; // e.g. "Class A"
}

@Injectable({
  providedIn: 'root',
})
export class AddScheduleService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getAllTeachers(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    });

    return this.http.get<any>(`${this.apiUrl}/users/teachers`, {headers});
  }

  createSchedule(schedule: Schedule): Observable<Schedule> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    });

    return this.http.post<Schedule>(`${this.apiUrl}/schedules`, schedule, {headers});
  }

  getSchedules(): Observable<Schedule[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    });

    return this.http.get<Schedule[]>(`${this.apiUrl}/schedules`, { headers });
  }
}

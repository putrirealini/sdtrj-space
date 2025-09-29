import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyScheduleService {
  private apiUrl = 'http://localhost:5000/api/schedules'; // ganti sesuai endpoint backend

  constructor(private http: HttpClient) {}

  // ambil jadwal guru
  getSchedule(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    });
    return this.http.get<any>(this.apiUrl, { headers });
  }

  // download file jadwal (CSV)
  downloadSchedule(): Observable<Blob> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    });
    return this.http.get(`${this.apiUrl}/download`, {
      headers,
      responseType: 'blob'
    });
  }
}

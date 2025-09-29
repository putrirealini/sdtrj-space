import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcademicCalendarService {
  private apiUrl = 'http://localhost:5000/api'; // ganti sesuai endpoint backend

  constructor(private http: HttpClient) {}

  getAnnouncements(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    });
    return this.http.get<any>(`${this.apiUrl}/academic-calendar`, { headers });
  }
}

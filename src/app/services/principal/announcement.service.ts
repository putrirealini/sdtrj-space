import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private apiUrl = 'http://localhost:5000/api'; // ganti sesuai endpoint backend

  constructor(private http: HttpClient) {}

  getAnnouncements(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    });
    return this.http.get<any>(`${this.apiUrl}/announcements`, { headers });
  }

  createAnnouncement(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    });
    return this.http.post<any>(`${this.apiUrl}/announcements`, formData, { headers });
  }

  editAnnouncement(id: string, formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    });
    return this.http.put<any>(`${this.apiUrl}/announcements/${id}`, formData, { headers });
  }

  deleteAnnouncement(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    });
    return this.http.delete<any>(`${this.apiUrl}/announcements/${id}`, { headers });
  }

  downloadAnnouncementAttachment(id: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    });
    return this.http.get(`${this.apiUrl}/announcements/${id}/download`, {
      headers,
      responseType: 'blob'
    });
  }
}

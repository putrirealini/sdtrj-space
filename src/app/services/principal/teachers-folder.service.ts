import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherFolderService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  // Ambil semua folder
  getTeacherFolders(): Observable<any> {
    const token = localStorage.getItem('token'); // atau sessionStorage, sesuai kamu simpan di mana
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/users/teachers`, { headers });
  }
}

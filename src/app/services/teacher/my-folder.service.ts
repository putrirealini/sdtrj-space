import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyFolderService {
  private apiUrl = 'http://localhost:5000/api/folders';

  constructor(private http: HttpClient) {}

  // Ambil semua folder
  getMyFolders(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }

  getFolderByType(folderType: string): Observable<any> {
    let url = `${this.apiUrl}/${folderType}`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(url, { headers });
  }

  //uploadFile to /api/folders/:folderType/upload
  uploadFile(folderType: string, formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${this.apiUrl}/${folderType}/upload`, formData, { headers });
  }

  // Delete file
  deleteFile(folderType: string, fileId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<any>(`${this.apiUrl}/${folderType}/files/${fileId}`, { headers });
  }

  // Download file
  downloadFile(folderType: string, fileId: string): Observable<Blob> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/${folderType}/files/${fileId}/download`, {
      headers,
      responseType: 'blob' // supaya bisa ambil file beneran
    });
  }

}

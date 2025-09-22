import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Diperlukan untuk *ngIf

@Component({
  selector: 'app-academic-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './principal-academic-calendar.html',
  styleUrls: ['./principal-academic-calendar.css']
})
export class PrincipalAcademicCalendarComponent {
  
  imageUrl: string | ArrayBuffer | null = null;

  // Fungsi ini akan dijalankan saat pengguna selesai memilih file
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      
      // FileReader digunakan untuk membaca file dari komputer pengguna
      const reader = new FileReader();
      
      // Saat proses baca selesai, URL gambar akan disimpan di imageUrl
      reader.onload = e => this.imageUrl = reader.result;
      
      // Perintahkan FileReader untuk mulai membaca file
      reader.readAsDataURL(file);
    }
  }
}
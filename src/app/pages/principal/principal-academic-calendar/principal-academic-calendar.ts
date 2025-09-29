import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalAcademicCalendarService } from '../../../services/principal/principal-academic-calendar';

@Component({
  selector: 'app-academic-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './principal-academic-calendar.html',
  styleUrls: ['./principal-academic-calendar.css']
})
export class PrincipalAcademicCalendarComponent {
  imageUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(private principalAcademicCalendarService: PrincipalAcademicCalendarService) {}

  // Saat file dipilih
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFile = file;

      // Preview gambar
      const reader = new FileReader();
      reader.onload = e => (this.imageUrl = reader.result);
      reader.readAsDataURL(file);

      // Upload ke server langsung setelah pilih
      this.uploadFile(file);
    }
  }

  uploadFile(file: File): void {
    const formData = new FormData();
    formData.append('calendar', file);

    this.principalAcademicCalendarService.uploadAcademicCalendar(formData).subscribe({
      next: res => {
        console.log('Upload success:', res);
        alert('Academic calendar uploaded successfully!');
      },
      error: err => {
        console.error('Upload error:', err);
        alert('Failed to upload academic calendar.');
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

interface AnnouncementData {
  title: string;
  date: string;
  attachmentUrl?: string;
  fileObject?: File; 
}

@Component({
  selector: 'app-announcement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './announcement.html',
  styleUrl: './announcement.css'
})
export class Announcement implements OnInit {
  announcements: AnnouncementData[] = [
    { title: 'New Student Orientation', date: '01, Jul 2025', attachmentUrl: '#' },
    { title: 'School Anniversary', date: '23, Jul 2025', attachmentUrl: '#' },
  ];

  showAddModal = false;
  openMenuIndex: number | null = null;


  announcementForm!: FormGroup;
  selectedFile: File | null = null;
  selectedFileName: string | null = null;
  editIndex: number | null = null;

  ngOnInit(): void {

    this.announcementForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null) 
    });
  }


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
    }
  }


  addAnnouncement(): void {
    if (this.announcementForm.valid) {
      if (this.editIndex !== null) {
        // --- LOGIKA UNTUK UPDATE ---
        const updatedAnnouncement = {
          ...this.announcements[this.editIndex], // Salin data lama
          title: this.announcementForm.value.title,
          fileObject: this.selectedFile || undefined,
          attachmentUrl: this.selectedFile ? URL.createObjectURL(this.selectedFile) : this.announcements[this.editIndex].attachmentUrl
        };
        this.announcements[this.editIndex] = updatedAnnouncement; // Ganti data lama dengan data baru
      } else {
        // --- LOGIKA UNTUK TAMBAH BARU (tetap sama) ---
        const newAnnouncement: AnnouncementData = {
          title: this.announcementForm.value.title,
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          fileObject: this.selectedFile || undefined,
          attachmentUrl: this.selectedFile ? URL.createObjectURL(this.selectedFile) : '#'
        };
        this.announcements.unshift(newAnnouncement);
      }

      // Reset form dan tutup modal
      this.announcementForm.reset();
      this.selectedFile = null;
      this.selectedFileName = null;
      this.editIndex = null; // Reset editIndex
      this.toggleAddModal();
    }
  }


   openEditModal(index: number, event: MouseEvent) {
    event.stopPropagation();
    this.editIndex = index; // Simpan index item yang akan diedit
    const announcementToEdit = this.announcements[index];
    
    // Isi form dengan data yang sudah ada
    this.announcementForm.patchValue({
      title: announcementToEdit.title,
      description: '' // Deskripsi bisa dikosongkan atau ditambahkan ke interface jika ada
    });
    
    this.selectedFile = announcementToEdit.fileObject || null;
    this.selectedFileName = announcementToEdit.fileObject?.name || null;

    this.showAddModal = true; // Buka modal
    this.openMenuIndex = null; // Tutup menu opsi
  }


 

  openAnnouncement(item: AnnouncementData, event: MouseEvent): void {
    // Cek agar tidak membuka file saat tombol download atau opsi diklik
    const target = event.target as HTMLElement;
    if (target.closest('.download-link, .options-container')) {
      return;
    }

    if (item.fileObject) {
      const fileURL = URL.createObjectURL(item.fileObject);
      window.open(fileURL, '_blank');
    } else {
      console.log('Tidak ada file fisik untuk dibuka.');
    }
  }

  downloadFile(item: AnnouncementData, event: MouseEvent): void {
    event.stopPropagation(); // Mencegah fungsi openAnnouncement ikut berjalan

    if (item.fileObject) {
      const fileURL = URL.createObjectURL(item.fileObject);
      const link = document.createElement('a');
      link.href = fileURL;
      link.download = item.fileObject.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(fileURL);
    } else {
      alert('Download hanya berfungsi untuk file yang baru di-upload.');
    }
  }

deleteAnnouncement(index: number, event: MouseEvent): void {
  event.stopPropagation(); 
  

  this.announcements.splice(index, 1);
  

  this.openMenuIndex = null;
}
  toggleAddModal() {
    this.showAddModal = !this.showAddModal;
    if (!this.showAddModal) {
      // Jika modal ditutup (misal klik cancel), reset semuanya
      this.announcementForm.reset();
      this.selectedFile = null;
      this.selectedFileName = null;
      this.editIndex = null;
    }
  }
  toggleOptionsMenu(index: number, event: MouseEvent) {
    event.stopPropagation();
    this.openMenuIndex = this.openMenuIndex === index ? null : index;
  }
}
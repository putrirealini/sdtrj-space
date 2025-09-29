import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AnnouncementService } from '../../../services/principal/announcement.service';

interface AnnouncementData {
  _id?: string;
  title: string;
  description?: string;
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
  announcements: AnnouncementData[] = [];

  showAddModal = false;
  openMenuIndex: number | null = null;

  announcementForm!: FormGroup;
  selectedFile: File | null = null;
  selectedFileName: string | null = null;
  editIndex: number | null = null;

  constructor(private announcementService: AnnouncementService) {}

  ngOnInit(): void {
    this.announcementForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('')
    });

    this.loadAnnouncements();
  }

  loadAnnouncements(): void {
    this.announcementService.getAnnouncements().subscribe((res: any) => {
      if (res.success) {
        this.announcements = res.data.map((item: any) => ({
          _id: item._id,
          title: item.title,
          description: item.description,
          date: new Date(item.createdAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          }),
          attachmentUrl: item.attachment ? item.attachment.filePath : undefined
        }));
      }
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
      const formData = new FormData();
      formData.append('title', this.announcementForm.value.title);
      formData.append('description', this.announcementForm.value.description || '');
      if (this.selectedFile) {
        formData.append('attachment', this.selectedFile);
      }

      if (this.editIndex !== null && this.announcements[this.editIndex]._id) {
        // --- EDIT ANNOUNCEMENT ---
        const id = this.announcements[this.editIndex]._id!;
        this.announcementService.editAnnouncement(id, formData).subscribe(() => {
          this.loadAnnouncements();
          this.resetForm();
        });
      } else {
        // --- ADD ANNOUNCEMENT ---
        this.announcementService.createAnnouncement(formData).subscribe(() => {
          this.loadAnnouncements();
          this.resetForm();
        });
      }
    }
  }

  deleteAnnouncement(index: number, event: MouseEvent): void {
    event.stopPropagation();

    if (!confirm('Are you sure you want to delete this announcement?')) {
      this.openMenuIndex = null;
      return;
    }

    const id = this.announcements[index]._id;
    if (!id) return;

    this.announcementService.deleteAnnouncement(id).subscribe(() => {
      this.announcements.splice(index, 1);
      this.openMenuIndex = null;
    });
  }

  downloadFile(item: AnnouncementData, event: MouseEvent): void {
    event.stopPropagation();
    if (!item._id) return;

    this.announcementService.downloadAnnouncementAttachment(item._id).subscribe((blob: Blob) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = item.title || 'attachment';
      link.click();
      window.URL.revokeObjectURL(link.href);
    });
  }

  openEditModal(index: number, event: MouseEvent) {
    event.stopPropagation();
    this.editIndex = index;
    const announcementToEdit = this.announcements[index];

    this.announcementForm.patchValue({
      title: announcementToEdit.title,
      description: announcementToEdit.description
    });

    this.showAddModal = true;
    this.openMenuIndex = null;
  }

  openAnnouncement(item: AnnouncementData, event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.closest('.download-link, .options-container')) return;

    if (item.attachmentUrl) {
      window.open(item.attachmentUrl, '_blank');
    } else {
      console.log('Tidak ada file untuk dibuka.');
    }
  }

  toggleAddModal() {
    this.showAddModal = !this.showAddModal;
    if (!this.showAddModal) {
      this.resetForm();
    }
  }

  toggleOptionsMenu(index: number, event: MouseEvent) {
    event.stopPropagation();
    this.openMenuIndex = this.openMenuIndex === index ? null : index;
  }

  private resetForm(): void {
    this.announcementForm.reset();
    this.selectedFile = null;
    this.selectedFileName = null;
    this.editIndex = null;
    this.showAddModal = false;
  }
}

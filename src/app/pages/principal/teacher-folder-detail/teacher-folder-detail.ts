import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { TeacherFolderDetailService } from '../../../services/principal/teacher-folder-detail.service';
import { User } from '../../../services/auth.service';

interface FileData {
  _id: string;
  name: string;
  lastModified: string;
  size: string;
  fileObject?: File;
  filePath?: string;
  folderType?: string;
}

@Component({
  selector: 'app-teacher-folder-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './teacher-folder-detail.html',
  styleUrl: './teacher-folder-detail.css'
})
export class TeacherFolderDetailComponent implements OnInit {
  teacherId: string | null = '';
  folderName: string | null = '';
  files: FileData[] = [];
  user: User | null = null;

  openMenuIndex: number | null = null;
  showUploadModal = false;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private teacherFolderDetailService: TeacherFolderDetailService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.teacherId = params.get('teacherId') ?? '';
      this.folderName = params.get('folderName') ?? '';

      if (this.teacherId && this.folderName) {
        this.loadFiles(this.teacherId, this.folderName);
      }
    });
  }

  loadFiles(teacherId: string, folderType: string): void {
    this.loading = true;

    this.teacherFolderDetailService.getFolderByType(teacherId, folderType).subscribe({
      next: (res: any) => {
        if (res?.success && Array.isArray(res.files)) {
          this.files = res.files.map((f: any) => {
            const date = new Date(f.updatedAt || f.createdAt);

            this.user = {
              id: res.user._id,
              name: res.user.name,
              email: res.user.email,
              nip: res.user.nip,
              role: res.user.role
            };

            return {
              _id: f._id,
              name: f.originalName,
              lastModified: date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }),
              size: f.fileSize ? `${Math.round(f.fileSize / 1024)} KB` : 'Unknown',
              filePath: f.filePath,
              folderType,
            };
          });
        } else {
          this.files = [];
        }
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error load files:', err);
        this.files = [];
        this.loading = false;
      }
    });
  }

  toggleOptionsMenu(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.openMenuIndex = this.openMenuIndex === index ? null : index;
  }

  toggleUploadModal(): void {
    this.showUploadModal = !this.showUploadModal;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file && this.folderName && this.teacherId) {
      const formData = new FormData();
      formData.append('file', file);

      this.teacherFolderDetailService.uploadFile(this.teacherId, this.folderName, formData).subscribe({
        next: () => {
          alert('File berhasil diupload.');
          this.loadFiles(this.teacherId!, this.folderName!); // reload list
          this.showUploadModal = false;
          input.value = ''; // reset input biar bisa upload file dengan nama sama
        },
        error: (err: any) => console.error('Upload error:', err)
      });
    }
  }

  openFile(fileData: FileData): void {
    if (fileData.filePath) {
      window.open(`http://localhost:5000/${fileData.filePath}`, '_blank');
    } else {
      console.log('Tidak ada filePath dari server.');
    }
  }

  deleteFile(teacherId: string, fileData: FileData, index: number, event: MouseEvent): void {
    event.stopPropagation();

    if (!fileData._id || !fileData.folderType) {
      alert('Data file tidak valid.');
      return;
    }

    this.teacherFolderDetailService.deleteFile(teacherId, fileData.folderType, fileData._id).subscribe({
      next: (res: any) => {
        this.files.splice(index, 1);
        this.openMenuIndex = null;
        alert('File berhasil dihapus.');
      },
      error: (err) => {
        console.error('Delete file error:', err);
        alert('Gagal menghapus file. Coba lagi.');
        this.openMenuIndex = null;
      }
    });
  }

  downloadFile(teacherId: string, fileData: FileData, event: MouseEvent): void {
    event.stopPropagation();
    if (!fileData._id || !fileData.folderType) {
      alert('Data file tidak valid.');
      return;
    }

    this.teacherFolderDetailService.downloadFile(teacherId, fileData.folderType, fileData._id).subscribe({
      next: (blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = fileURL;
        a.download = fileData.name || 'downloaded-file';
        a.click();
        window.URL.revokeObjectURL(fileURL);
        this.openMenuIndex = null;
        alert('File berhasil didownload.');
      },
      error: (err) => {
        console.error('Download file error:', err);
        alert('Gagal mendownload file.');
        this.openMenuIndex = null;
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}

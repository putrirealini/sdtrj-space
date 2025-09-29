import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MyFolderService } from '../../../services/teacher/my-folder.service';

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
  selector: 'app-my-folder2',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-folder2.html',
  styleUrl: './my-folder2.css'
})
export class MyFolder2 implements OnInit {
  folderName: string | null = '';
  files: FileData[] = [];

  openMenuIndex: number | null = null;
  showUploadModal = false;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private folderService: MyFolderService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.folderName = params.get('folderName');
      if (this.folderName) {
        this.loadFiles(this.folderName);
      }
    });
  }

  loadFiles(folderType: string): void {
    this.loading = true;
    this.folderService.getFolderByType(folderType).subscribe({
      next: (res:any) => {
        if (res.success && res.files) {
          this.files = res.files.map((f: any) => {
            const date = new Date(f.updatedAt || f.createdAt);

            const formattedDate = date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });

            return {
              _id: f._id,
              name: f.originalName,
              lastModified: formattedDate,
              size: `${Math.round(f.fileSize / 1024)} KB`,
              filePath: f.filePath,
              folderType: folderType,
            };
          });
        }
        this.loading = false;
      },
      error: (err:any) => {
        console.error('Error load files:', err);
        this.files = [];
        this.loading = false;
      }
    });
  }

  toggleOptionsMenu(index: number, event: MouseEvent) {
    event.stopPropagation();
    this.openMenuIndex = this.openMenuIndex === index ? null : index;
  }

  toggleUploadModal() {
    this.showUploadModal = !this.showUploadModal;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file && this.folderName) {
      const formData = new FormData();
      formData.append('file', file);

      this.folderService.uploadFile(this.folderName, formData).subscribe({
        next: (res: any) => {
          console.log('File uploaded:', res);
          this.loadFiles(this.folderName!); // reload list
          this.showUploadModal = false;
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

  deleteFile(fileData: FileData, index: number, event: MouseEvent): void {
    event.stopPropagation();

    if (!fileData._id || !fileData.folderType) {
      alert('Data file tidak valid.');
      return;
    }

    this.folderService.deleteFile(fileData.folderType, fileData._id).subscribe({
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

  downloadFile(fileData: FileData, event: MouseEvent): void {
    event.stopPropagation();

    if (!fileData._id || !fileData.folderType) {
      alert('Data file tidak valid.');
      return;
    }

    this.folderService.downloadFile(fileData.folderType, fileData._id).subscribe({
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
}

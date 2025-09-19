import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Definisikan struktur data untuk sebuah file
interface FileData {
  name: string;
  lastModified: string;
  size: string;
  fileObject?: File;
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

  // Ini adalah data palsu kita untuk daftar file
  files: FileData[] = [
    { name: 'Mathematics for grade 6.pdf', lastModified: 'July 20, 2025', size: '828 KB' },
    { name: 'Science for grade 4.pdf', lastModified: 'August 1, 2025', size: '900 KB' },
    { name: 'Spelling practice.jpg', lastModified: 'June 18, 2025', size: '217 KB' },
    { name: 'Reading practice.jpg', lastModified: 'July 2, 2025', size: '412 KB' }
  ];

  // Properti untuk mengontrol menu opsi & modal upload
  openMenuIndex: number | null = null;
  showUploadModal = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Mengambil nama folder dari URL untuk dijadikan judul
    this.route.paramMap.subscribe(params => {
      this.folderName = params.get('folderName');
    });
  }

  // Fungsi untuk membuka/menutup menu opsi (titik tiga)
  toggleOptionsMenu(index: number, event: MouseEvent) {
    event.stopPropagation(); // <-- TAMBAHKAN BARIS INI

    if (this.openMenuIndex === index) {
      this.openMenuIndex = null;
    } else {
      this.openMenuIndex = index;
    }
  }

  // Fungsi untuk membuka/menutup modal upload
  toggleUploadModal() {
    this.showUploadModal = !this.showUploadModal;
  }

  // Fungsi untuk menangani file yang dipilih dari pop-up
   onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      // 1. Format Tanggal Hari Ini
      const today = new Date();
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = today.toLocaleDateString('en-US', options);

      // 2. Format Ukuran File (dari Bytes ke KB)
      const fileSizeInKB = Math.round(file.size / 1024);
      const formattedSize = `${fileSizeInKB} KB`;

      // 3. Buat objek file baru yang sesuai dengan format data kita
      const newFile = {
        name: file.name,
        lastModified: formattedDate,
        size: formattedSize,
         fileObject: file
      };

      // 4. Tambahkan file baru ke bagian paling atas daftar
      this.files.unshift(newFile);

      console.log('File ditambahkan ke daftar:', newFile);
    }
  }

   openFile(fileData: FileData): void {
    // Cek apakah ada objek file asli yang tersimpan
    if (fileData.fileObject) {
      // Buat URL sementara untuk file tersebut
      const fileURL = URL.createObjectURL(fileData.fileObject);
      // Buka URL di tab baru
      window.open(fileURL, '_blank');
    } else {
      console.log('Tidak ada file fisik untuk dibuka (ini adalah data palsu).');
    }
  }

   deleteFile(index: number, event: MouseEvent): void {
    event.stopPropagation(); // Mencegah event klik menyebar ke baris (div) di belakangnya
    this.files.splice(index, 1); // Menghapus file dari array berdasarkan posisinya (index)
    this.openMenuIndex = null; // Menutup menu setelah file dihapus
    console.log(`File di index ${index} telah dihapus.`);
  }

  downloadFile(fileData: FileData, event: MouseEvent): void {
    event.stopPropagation(); // Mencegah event klik menyebar

    // Cek apakah ada objek file asli (bukan data palsu)
    if (fileData.fileObject) {
      // Buat URL sementara untuk file
      const fileURL = URL.createObjectURL(fileData.fileObject);
      
      // Buat elemen link <a> sementara di memori
      const link = document.createElement('a');
      link.href = fileURL;
      link.download = fileData.name; // Nama file saat di-download

      // Picu klik pada link untuk memulai download
      document.body.appendChild(link);
      link.click();

      // Hapus link setelah selesai
      document.body.removeChild(link);
      URL.revokeObjectURL(fileURL); // Bebaskan memori
    } else {
      alert('Download hanya berfungsi untuk file yang baru di-upload.');
    }
    this.openMenuIndex = null; // Menutup menu
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Diperlukan untuk *ngFor dan *ngIf

@Component({
  selector: 'app-my-schedule',
  standalone: true,
  imports: [CommonModule], // Tambahkan CommonModule ke imports
  templateUrl: './my-schedule.html', // Sesuaikan nama file jika perlu
  styleUrls: ['./my-schedule.css'] // Sesuaikan nama file jika perlu
})
export class MySchedule {

  // Data jadwal disimpan dalam bentuk array of objects
  scheduleData = [
    { period: 1, time: '07.55 - 08.30', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '' },
    { period: 2, time: '08.30 - 09.05', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '' },
    { period: 3, time: '09.05 - 09.40', monday: 'Pancasila 1B', tuesday: 'Matematika 1B', wednesday: 'B.Indo 1B', thursday: '', friday: '' },
    { period: null, time: '09.40 - 10.10', activity: 'RECESS I' },
    { period: 4, time: '10.10 - 10.45', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '' },
    { period: 5, time: '10.45 - 11.20', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '' },
    { period: 6, time: '11.20 - 11.55', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '' },
    { period: null, time: '11.55 - 12.25', activity: 'RECESS II' },
    { period: 7, time: '12.25 - 13.00', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '' },
    { period: 8, time: '13.00 - 13.35', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '' },
    { period: 9, time: '13.35 - 14.10', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '' },
  ];

  downloadSchedule(): void {
    // 1. Buat header untuk file CSV
    let csvContent = "Period,Time,Monday,Tuesday,Wednesday,Thursday,Friday\n";

    // 2. Loop melalui data jadwal dan ubah menjadi format CSV
    this.scheduleData.forEach(row => {
      let csvRow: string;
      if (row.activity) {
        // Baris khusus untuk Istirahat (Recess)
        csvRow = `${row.period || ''},"${row.time}","${row.activity}","","","",""\n`;
      } else {
        // Baris jadwal normal
        csvRow = `${row.period},"${row.time}","${row.monday}","${row.tuesday}","${row.wednesday}","${row.thursday}","${row.friday}"\n`;
      }
      csvContent += csvRow;
    });

    // 3. Buat file virtual (Blob) dan trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "MySchedule.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// MENGGUNAKAN PATH ABSOLUT DARI FOLDER 'app'
import { AddScheduleModalComponent } from 'app/pages/principal/add-schedule-modal/add-schedule-modal';

@Component({
  selector: 'app-teacher-schedule',
  standalone: true,
  imports: [CommonModule, AddScheduleModalComponent],
  templateUrl: './teacher-schedule.html',
  styleUrls: ['./teacher-schedule.css']
})
export class TeacherScheduleComponent {

  isModalOpen = false;

  teachers = [
    { id: 1, name: 'Ms. Indah Nurdiana' },
    { id: 2, name: 'Ms. Ida Ayu Widiasrami' },
    { id: 3, name: 'Ms. Ni Luh Putu Suastiningsih' },
    { id: 4, name: 'Ms. Ni Made Trisna Suryaningsih' },
    { id: 5, name: 'Ms. Ni Kadek Nia Sucah Yanti' },
    { id: 6, name: 'Ms. Ni Made Ari Dwipayanti' },
    { id: 7, name: 'Ms. Desak Made Diah Kumara Dewi' },
    { id: 8, name: 'Ms. A.A Sagung Anik Udayani' },
    { id: 9, name: 'Ms. Lois Putriasih' },
    { id: 10, name: 'Ms. Vindha Yusmita Arininda'},
    { id: 11, name: 'Ms. Putu Sri Suci Ningsih'},
    { id: 12, name: 'Ms. Ni Luh Rosita Damayanthi'},
    { id: 13, name: 'Ms. Ni Made Lestari'},
    { id: 14, name: 'Ms. Erni Damayanti Br Samosir'},
    { id: 15, name: 'Ms. Ni Ketut Yonita' }, 
    { id: 16, name: 'Ms. Ni Wayan Rahayu' },
    { id: 17, name: 'Ms. Luh Putu Astiti Pradnyayanti' }, 
    { id: 18, name: 'Ms. Made Putri Ari Susanthi' },
    { id: 19, name: 'Ms. Philna Van Der Merwe' },
    { id: 20, name: 'Ms. Sara Joelle Franke' },
    { id: 21, name: 'Ms. Frisca Yulike Budianto' },
    { id: 22, name: 'Ms. Dra Marhamah' }, 
    { id: 23, name: 'Ms. Yeti Hastita' }, 
    { id: 24, name: 'Ms. Nursiah' }, 
    { id: 25, name: 'Sir. Gede Satya Narendra Arya' },
    { id: 26, name: 'Sir. Infantri Abeng' },
    { id: 27, name: 'Ms. Allyssa Camille Marquez Quijano' }, 
    { id: 28, name: 'Ms. Christine Jane Delueste Quijana' }, 
    { id: 29, name: 'Ms. Ni Putu Manik Candra Dewi' }, 
    { id: 30, name: 'Sir. Robertus Bagus Firstnanda' },
  ];

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

  openAddScheduleModal(): void {
    this.isModalOpen = true;
  }

  closeAddScheduleModal(): void {
    this.isModalOpen = false;
  }
}
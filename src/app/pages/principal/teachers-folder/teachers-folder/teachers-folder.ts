import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Diperlukan untuk *ngFor

@Component({
  selector: 'app-teachers-folder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teachers-folder.html',
  styleUrls: ['./teachers-folder.css']
})
export class TeachersFolderComponent {

  // Daftar nama guru, Anda bisa lengkapi hingga 32
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
    { id: 31, name: 'Ms. Ni Komang Ayu Aprilia Nita' },
  
  ];

}
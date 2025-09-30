import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Diperlukan untuk *ngFor
import { TeacherFolderService } from '../../../services/principal/teachers-folder.service';

@Component({
  selector: 'app-teachers-folder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teachers-folder.html',
  styleUrls: ['./teachers-folder.css']
})
export class TeachersFolderComponent implements OnInit {
  teacherFolders: any[] = [];

  constructor(private teacherFolderService: TeacherFolderService) {}

  ngOnInit(): void {
    this.teacherFolderService.getTeacherFolders().subscribe((res: any) => {
      this.teacherFolders = Object.keys(res.data).map(key => ({
        id: res.data[key]['_id'],
        name: res.data[key]['name'],
        nip: res.data[key]['nip'],
        email: res.data[key]['email'],
      }));
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TeacherFolderService } from '../../../services/principal/teacher-folder.service';
import { TitleCasePipe, CommonModule, Location } from '@angular/common';
import { AuthService, User } from '../../../services/auth.service';

@Component({
  selector: 'app-teacher-folder',
  standalone: true,
  imports: [RouterModule, TitleCasePipe, CommonModule],
  templateUrl: './teacher-folder.html',
  styleUrl: './teacher-folder.css'
})
export class TeacherFolderComponent implements OnInit {
  teacherFolders: any[] = [];
  teacherId: string | null = '';
  user: User | null = null;

  constructor(
    private teacherFolderService: TeacherFolderService,
    private location: Location,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.teacherId = params.get('teacherId');
      if (this.teacherId) {
        this.loadTeacherFolder(this.teacherId);
      }
    });
  }

  loadTeacherFolder(teacherId: string): void {
    this.teacherFolderService.getTeacherFolders(teacherId).subscribe((res: any) => {
      this.teacherFolders = Object.keys(res.data).map(key => ({
        name: key,
        value: res.data[key]
      }));
      this.user = {
        id: res.user._id,
        name: res.user.name,
        email: res.user.email,
        nip: res.user.nip,
        role: res.user.role
      };
    });
  }

  goBack(): void {
    this.location.back();
  }
}

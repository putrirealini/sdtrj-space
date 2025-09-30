import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MyFolderService } from '../../../services/teacher/my-folder.service';
import { TitleCasePipe, CommonModule, Location } from '@angular/common';
import { AuthService, User } from '../../../services/auth.service';

@Component({
  selector: 'app-my-folder',
  standalone: true,
  imports: [RouterModule, TitleCasePipe, CommonModule],
  templateUrl: './my-folder.html',
  styleUrl: './my-folder.css'
})
export class MyFolder implements OnInit {
  myfolders: any[] = [];
  user: User | null = null;

  constructor(
    private myFolderService: MyFolderService,
    private location: Location,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();

    this.myFolderService.getMyFolders().subscribe((res: any) => {
      this.myfolders = Object.keys(res.data).map(key => ({
        name: key,
        value: res.data[key]
      }));
    });
  }

  goBack(): void {
    this.location.back();
  }
}

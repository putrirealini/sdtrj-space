import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MyFolderService } from '../../../services/teacher/my-folder.service';
import { TitleCasePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-folder',
  standalone: true,
  imports: [RouterModule, TitleCasePipe, CommonModule],
  templateUrl: './my-folder.html',
  styleUrl: './my-folder.css'
})
export class MyFolder implements OnInit {
  myfolders: any[] = [];

  constructor(private myFolderService: MyFolderService) {}

  ngOnInit(): void {
    this.myFolderService.getMyFolders().subscribe((res: any) => {
      this.myfolders = Object.keys(res.data).map(key => ({
        name: key,
        value: res.data[key]
      }));
      console.log('my folders array', this.myfolders);
    });
  }
}

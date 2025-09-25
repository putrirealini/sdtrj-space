import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-my-folder',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './my-folder.html',
  styleUrl: './my-folder.css'
})
export class MyFolder {


  constructor(private location: Location) {}


  goBack(): void {
    this.location.back();
  }
}

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-principal-layout',
  imports: [CommonModule, RouterModule],
  templateUrl: './principal-layout.html',
  styleUrl: './principal-layout.css'
})
export class PrincipalLayout {
  isProfileMenuOpen = false;

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

}

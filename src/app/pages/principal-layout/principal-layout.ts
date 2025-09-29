import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-principal-layout',
  imports: [CommonModule, RouterModule],
  templateUrl: './principal-layout.html',
  styleUrl: './principal-layout.css'
})
export class PrincipalLayout {
  isProfileMenuOpen = false;
  user: any;

  constructor(private authService: AuthService) {
    this.user = this.authService.getCurrentUser();
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  logout() {
    this.authService.logout();
  }
}

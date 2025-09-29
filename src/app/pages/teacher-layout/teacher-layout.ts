import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-teacher-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './teacher-layout.html',
  styleUrl: './teacher-layout.css'
})
export class TeacherLayout {
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

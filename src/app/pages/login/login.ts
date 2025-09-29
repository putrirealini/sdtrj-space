// src/app/pages/login/login.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService, LoginRequest } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  loginForm: FormGroup;
  error: string = '';
  showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    // Initialize form
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.authService.redirectToDashboard();
    }
  }

  ngOnInit(): void {
    // Clear any error messages on init
    this.error = '';
  }

  // Getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  // Toggle password visibility
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  // Check if form field has error
  hasFieldError(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  // Get specific field error message
  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        return `Password must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      email: 'Email',
      password: 'Password'
    };
    return displayNames[fieldName] || fieldName;
  }

  // Mark all form fields as touched to show validation errors
  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  // Handle form submission
  onSubmit(): void {
    // Clear previous errors
    this.error = '';

    // Check if form is valid
    if (this.loginForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    // Prepare login credentials
    const credentials: LoginRequest = {
      email: this.f['email'].value.trim(),
      password: this.f['password'].value
    };

    // Call auth service
    this.authService.login(credentials).subscribe({
      next: (response) => {
        if (response.success) {
          // Login successful - redirect will be handled by auth service
          console.log('Login successful:', response.message);
          this.authService.redirectToDashboard();
        } else {
          // Login failed
          this.error = response.message || 'Login failed. Please try again.';
        }
      },
      error: (error) => {
        // Handle any unexpected errors
        console.error('Login error:', error);
        this.error = 'An unexpected error occurred. Please try again.';
      }
    });
  }

  // Helper method to check if currently loading
  get isLoading(): boolean {
    let loading = false;
    this.authService.isLoading$.subscribe(state => loading = state);
    return loading;
  }
}

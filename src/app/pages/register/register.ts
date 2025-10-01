import { Component, OnInit } from '@angular/core';
import { AuthService, RegisterRequest } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {
  registerForm: FormGroup;
  error: string = '';
  showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nip: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    // Clear any error messages on init
    this.error = '';
  }

  // Getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  // Toggle password visibility
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  // Check if form field has error
  hasFieldError(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  // Get specific field error message
  getFieldError(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} is required`;
      }
      if (field.errors['email']) {
        return 'Invalid email format';
      }
      if (field.errors['minlength']) {
        return `${this.getFieldDisplayName(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
    }
    return '';
  }

  // Map field names to display names
  getFieldDisplayName(fieldName: string): string {
    const fieldNames: { [key: string]: string } = {
      name: 'Name',
      email: 'Email',
      password: 'Password',
      nip: 'NIP'
    };
    return fieldNames[fieldName] || fieldName;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  onSubmit(): void {
    this.error = '';

    // Check if form is valid
    if (this.registerForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    const credentials: RegisterRequest = {
      name: this.f['name'].value.trim(),
      email: this.f['email'].value.trim(),
      password: this.f['password'].value,
      nip: this.f['nip'].value.trim(),
    };

    this.authService.register(credentials).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Registration success');
          this.authService.redirectToDashboard();
        } else {
          this.error = response.message || 'Registration failed. Please try again.';
        }
      },
      error: (error) => {
        this.error = error.error?.message || 'Registration failed. Please try again.';
      }
    });
  }

  get isLoading(): boolean {
    let loading = false;
    this.authService.isLoading$.subscribe(value => loading = value);
    return loading;
  }
}

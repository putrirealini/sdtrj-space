// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
  nip: string;
  role: 'teacher' | 'principal';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  nip: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    user: User;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:5000/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  public currentUser$ = this.currentUserSubject.asObservable();
  public isLoading$ = this.isLoadingSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Check if user is already logged in
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        this.logout();
      }
    }
  }

  register(credentials: RegisterRequest): Observable<AuthResponse> {
    this.isLoadingSubject.next(true);

    return this.http.post<AuthResponse>(`${this.API_URL}/register`, credentials)
      .pipe(
        map(response => {
          this.isLoadingSubject.next(false);
          if (response.success && response.data) {
            // Store token and user data
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Update current user
            this.currentUserSubject.next(response.data.user);
          }
          return response;
        }),
        catchError(error => {
          this.isLoadingSubject.next(false);

          // Handle error response
          const errorResponse: AuthResponse = {
            success: false,
            message: error.error?.message || error.message || 'Registration failed'
          };

          return of(errorResponse);
        })
      );
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    this.isLoadingSubject.next(true);

    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials)
      .pipe(
        map(response => {
          this.isLoadingSubject.next(false);

          if (response.success && response.data) {
            // Store token and user data
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Update current user
            this.currentUserSubject.next(response.data.user);
          }
          return response;
        }),
        catchError(error => {
          this.isLoadingSubject.next(false);

          // Handle error response
          const errorResponse: AuthResponse = {
            success: false,
            message: error.error?.message || error.message || 'Login failed'
          };

          return of(errorResponse);
        })
      );
  }

  logout(): void {
    // Remove from storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Update current user
    this.currentUserSubject.next(null);

    // Redirect to login
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.getCurrentUser();
  }

  isTeacher(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'teacher';
  }

  isPrincipal(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'principal';
  }

  redirectToDashboard(): void {
    const user = this.getCurrentUser();
    if (user?.role === 'teacher') {
      this.router.navigate(['/teacher/teacher-dashboard']); // atau route dashboard teacher Anda
    } else if (user?.role === 'principal') {
      this.router.navigate(['/principal/principal-dashboard']); // atau route dashboard principal Anda
    } else {
      this.router.navigate(['/dashboard']); // fallback
    }
  }
}

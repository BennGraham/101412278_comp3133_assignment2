import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentSubject = new BehaviorSubject<User | null>(
    this.getSessionUser()
  );
  private sessionTimeoutId: any;

  readonly currentUser$ = this.currentSubject.asObservable();

  constructor(private router: Router) {
    this.setupSessionTimeout();
  }

  private getSessionUser(): User | null {
    const userToken = sessionStorage.getItem('currentSubject');
    return userToken ? JSON.parse(userToken) : null;
  }

  private setupSessionTimeout() {
    if (this.sessionTimeoutId) {
      clearTimeout(this.sessionTimeoutId);
    }

    if (this.currentSubject.value) {
      this.sessionTimeoutId = setTimeout(() => {
        this.logout();
      }, 3600000);
    }
  }

  public refreshSession() {
    this.setupSessionTimeout();
  }

  public getCurrentSubject(): User | null {
    return this.currentSubject.value;
  }

  setCurrentUser(user: User | null) {
    if (user) {
      sessionStorage.setItem('currentSubject', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('currentSubject');
    }
    this.currentSubject.next(user);
  }

  logout() {
    this.currentSubject.next(null);
    if (this.sessionTimeoutId) {
      clearTimeout(this.sessionTimeoutId);
    }
    sessionStorage.removeItem('currentSubject');
    this.currentSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentSubject.value;
  }
}

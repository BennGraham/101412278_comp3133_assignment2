import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <mat-toolbar>
      <span>COMP3133 | Assignment 2</span>
      <span class="spacer"></span>
      <button
        routerLink="/login"
        routerLinkActive="active-link"
        mat-icon-button
        aria-label="Login link"
      >
        <mat-icon>login</mat-icon>
      </button>
      <button
        routerLink="/signup"
        routerLinkActive="active-link"
        mat-icon-button
        aria-label="Signup link"
      >
        <mat-icon>person_add</mat-icon>
      </button>
      <button
        routerLink="/employee"
        mat-icon-button
        routerLinkActive="active-link"
        aria-label="Employee link"
      >
        <mat-icon>people</mat-icon>
      </button>
    </mat-toolbar>

    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = '101412278_comp3133_assignment2';
}

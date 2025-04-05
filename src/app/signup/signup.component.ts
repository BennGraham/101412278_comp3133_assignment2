import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GraphqlService } from '../network/graphql.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  standalone: true,
})
export class SignupComponent {
  hidePassword = true;
  signupForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private graphqlService: GraphqlService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  get username() {
    return this.signupForm.get('username');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.graphqlService
        .signup(
          this.username?.value!,
          this.email?.value!,
          this.password?.value!
        )
        .subscribe({
          next: (user) => {
            console.log('success! new user: ', user);
            this.snackbar.open('Signup Successful! Please log in.', 'Close', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              panelClass: ['success-snackbar'],
            });
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.error(error);
            this.snackbar.open(`Signup Failed! ${error.message}`, 'Close', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              panelClass: ['error-snackbar'],
            });
          },
        });
    }
  }
}

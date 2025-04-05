import { Component } from "@angular/core";
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { GraphqlService } from "../network/graphql.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
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
export class LoginComponent {
  hidePassword = true;
  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private graphqlService: GraphqlService,
    private router: Router,
    private snackbar: MatSnackBar,
  ) {}

  get username() {
    return this.loginForm.get("username");
  }

  get password() {
    return this.loginForm.get("password");
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.graphqlService
        .login(this.username?.value!, this.password?.value!)
        .subscribe({
          next: (user) => {
            if (user) {
              console.log("success, user: ", user);
              this.snackbar.open("Login successful", "Close", {
                duration: 2000,
              });
              this.router.navigate(["/employee"]);
            } else {
              console.log("user not found");
              this.snackbar.open(
                "This username & password combination is incorrect.",
                "Close",
                {
                  duration: 3000,
                },
              );
            }
          },
          error: (error) => {
            console.error(error);
          },
        });
    }
  }
}

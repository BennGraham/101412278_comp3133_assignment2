import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";

@Component({
  selector: "app-add-employee-dialog",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./new-employee-dialog.component.html",
  styleUrl: "./new-employee-dialog.component.css",
})
export class NewEmployeeDialogComponent {
  employeeForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<NewEmployeeDialogComponent>,
    private formBuilder: FormBuilder,
  ) {
    this.employeeForm = this.formBuilder.group({
      first_name: ["", [Validators.required]],
      last_name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      gender: ["", [Validators.required]],
      department: ["", [Validators.required]],
      designation: ["", [Validators.required]],
      salary: [1000, [Validators.required, Validators.min(1000)]],
      photo: [],
      joined_date: [new Date().toISOString(), [Validators.required]],
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.dialogRef.close(this.employeeForm.value);
    }
  }
}

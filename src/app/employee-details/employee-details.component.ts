import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AvatarComponent } from '../avatar/avatar.component';
import { Employee } from '../models/employee';
import { MatCardModule } from '@angular/material/card';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    AvatarComponent,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  providers: [],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css',
})
export class EmployeeDetailsComponent {
  isEditMode = false;
  employeeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EmployeeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      employee: Employee;
      currentIndex: number;
      totalEmployees: number;
      onNavigate: (direction: 'prev' | 'next') => Employee;
      onUpdate?: (employee: Employee) => void;
    },
    private formBuilder: FormBuilder
  ) {
    this.employeeForm = this.formBuilder.group({
      first_name: [data.employee.first_name, Validators.required],
      last_name: [data.employee.last_name, Validators.required],
      email: [data.employee.email, [Validators.required, Validators.email]],
      gender: [data.employee.gender, Validators.required],
      salary: [data.employee.salary, [Validators.required, Validators.min(0)]],
      department: [data.employee.department, Validators.required],
      designation: [data.employee.designation, Validators.required],
    });
  }

  navigate(direction: 'prev' | 'next') {
    if (this.isEditMode) return;
    const newEmployee = this.data.onNavigate(direction);
    this.data.employee = newEmployee;
    this.resetForm();
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      this.resetForm();
    }
  }

  resetForm() {
    if (this.employeeForm) {
      this.employeeForm.patchValue({
        first_name: this.data.employee.first_name,
        last_name: this.data.employee.last_name,
        email: this.data.employee.email,
        gender: this.data.employee.gender,
        salary: this.data.employee.salary,
        department: this.data.employee.department,
        designation: this.data.employee.designation,
      });
    }
  }

  saveChanges() {
    if (this.employeeForm.valid && this.data.onUpdate) {
      const formValue = this.employeeForm.value;
      const updatedEmployee = {
        ...this.data.employee,
        ...formValue,
      };
      this.data.onUpdate(updatedEmployee);
      this.data.employee = updatedEmployee;
      this.isEditMode = false;
    }
  }
}

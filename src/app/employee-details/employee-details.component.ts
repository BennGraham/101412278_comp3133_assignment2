import { Component, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { AvatarComponent } from "../avatar/avatar.component";
import { Employee } from "../models/employee";
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: "app-employee-details",
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    AvatarComponent,
    MatCardModule,
  ],
  templateUrl: "./employee-details.component.html",
  styleUrl: "./employee-details.component.css",
})
export class EmployeeDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<EmployeeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      employee: Employee;
      currentIndex: number;
      totalEmployees: number;
      onNavigate: (direction: "prev" | "next") => Employee;
    },
  ) {}

  navigate(direction: "prev" | "next") {
    const newEmployee = this.data.onNavigate(direction);
    this.data.employee = newEmployee;
  }
}

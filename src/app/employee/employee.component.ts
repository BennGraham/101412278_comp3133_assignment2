import { Component, OnInit } from '@angular/core';
import { GraphqlService } from '../network/graphql.service';
import { Employee } from '../models/employee';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AvatarComponent } from '../avatar/avatar.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';

@Component({
  selector: 'app-employee',
  imports: [
    CommonModule,
    MatCardModule,
    AvatarComponent,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  currentEmployeeIndex: number = 0;
  constructor(
    private graphqlService: GraphqlService,
    private dialog: MatDialog
  ) {}

  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'designation',
    'department',
  ];

  openEmployeeDialog(employee: Employee) {
    const currentIndex = this.employees.findIndex((emp) => emp === employee);
    this.currentEmployeeIndex = currentIndex;

    const dialogRef = this.dialog.open(EmployeeDetailsComponent, {
      width: '600px',
      data: {
        employee,
        currentIndex: this.currentEmployeeIndex,
        totalEmployees: this.employees.length,
        onNavigate: (direction: 'prev' | 'next') =>
          this.navigateEmployee(direction),
      },
    });
  }

  navigateEmployee(direction: 'prev' | 'next') {
    if (direction === 'next') {
      this.currentEmployeeIndex =
        (this.currentEmployeeIndex + 1) % this.employees.length;
    } else {
      this.currentEmployeeIndex =
        this.currentEmployeeIndex === 0
          ? this.employees.length - 1
          : this.currentEmployeeIndex - 1;
    }
    return this.employees[this.currentEmployeeIndex];
  }

  editEmployee(employee: Employee) {
    console.log('edit button');
  }

  deleteEmployee(employee: Employee) {
    console.log('delete button');
  }

  ngOnInit(): void {
    this.onLoad();
  }

  private onLoad() {
    return this.graphqlService.getAllEmployees().subscribe({
      next: (employees) => {
        console.log(employees);
        this.employees = employees;
      },
      error: (error) => {
        console.error('Error loading employees', error);
      },
    });
  }
}

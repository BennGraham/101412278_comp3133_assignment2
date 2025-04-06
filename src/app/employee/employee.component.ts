import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GraphqlService } from '../network/graphql.service';
import { Employee } from '../models/employee';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NewEmployeeDialogComponent } from '../new-employee-dialog/new-employee-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit, AfterViewInit {
  employees: Employee[] = [];
  currentEmployeeIndex: number = 0;
  dataSource = new MatTableDataSource<Employee>();
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private graphqlService: GraphqlService,
    private dialog: MatDialog
  ) {}

  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'designation',
    'department',
    'actions',
  ];

  openEmployeeDialog(employee: Employee) {
    const currentIndex = this.employees.findIndex((emp) => emp === employee);
    this.currentEmployeeIndex = currentIndex;

    const dialogRef = this.dialog.open(EmployeeDetailsComponent, {
      minWidth: '600px',
      maxWidth: '1200px',
      data: {
        employee,
        currentIndex: this.currentEmployeeIndex,
        totalEmployees: this.employees.length,
        onNavigate: (direction: 'prev' | 'next') =>
          this.navigateEmployee(direction),
        onUpdate: (updatedEmployee: Employee) =>
          this.updateEmployee(updatedEmployee),
      },
    });
  }

  openNewEmployeeDialog() {
    const dialogRef = this.dialog.open(NewEmployeeDialogComponent, {
      minWidth: '600px',
      maxWidth: '1200px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addEmployee(result);
      }
    });
  }

  updateEmployee(employee: Employee) {
    this.graphqlService.updateEmployee(employee).subscribe({
      next: (updatedEmployee) => {
        this.employees = this.employees.map((emp) =>
          emp.id === updatedEmployee.id ? updatedEmployee : emp
        );
        this.dataSource.data = this.employees;
      },
      error: (error) => {
        console.error('Error updating employee:', error);
      },
    });
  }

  addEmployee(employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>) {
    this.graphqlService.addEmployee(employee).subscribe({
      next: (newEmployee) => {
        this.employees = [...this.employees, newEmployee];
        this.dataSource.data = this.employees;
      },
      error: (error) => {
        console.error('Error adding employee:', error);
      },
    });
  }

  deleteEmployee(employee: Employee) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Employee',
        message: `Are you sure you want to delete ${employee.first_name} ${employee.last_name}?`,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.graphqlService.deleteEmployee(employee.id).subscribe({
          next: (deletedEmployee) => {
            this.employees = this.employees.filter(
              (emp) => emp.id !== deletedEmployee.id
            );
            this.dataSource.data = this.employees;
          },
          error: (error) => {
            console.error('Error deleting employee:', error);
          },
        });
      }
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

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.onLoad();
  }

  private onLoad() {
    return this.graphqlService.getAllEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
        this.dataSource.data = employees;
        this.dataSource.filterPredicate = (data: Employee, filter: string) => {
          const searchStr = Object.values(data).join(' ').toLowerCase();
          return searchStr.indexOf(filter.toLowerCase()) !== -1;
        };
      },
      error: (error) => {
        console.error('Error loading employees', error);
      },
    });
  }

  filterEmployees(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

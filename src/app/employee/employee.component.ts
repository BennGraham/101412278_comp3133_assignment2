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

@Component({
  selector: 'app-employee',
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
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

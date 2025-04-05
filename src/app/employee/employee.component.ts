import { Component, OnInit } from '@angular/core';
import { GraphqlService } from '../network/graphql.service';
import { Employee } from '../models/employee';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-employee',
  imports: [CommonModule, MatCardModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  constructor(private graphqlService: GraphqlService) {}

  ngOnInit(): void {
    this.onLoad();
  }

  private onLoad() {
    return this.graphqlService.getAllEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
      },
      error: (error) => {
        console.error('Error loading employees', error);
      },
    });
  }
}

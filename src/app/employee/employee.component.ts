import { Component, OnInit } from "@angular/core";
import { GraphqlService } from "../network/graphql.service";
import { Employee } from "../models/employee";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { AvatarComponent } from "../avatar/avatar.component";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-employee",
  imports: [
    CommonModule,
    MatCardModule,
    AvatarComponent,
    MatTableModule,
    MatIconModule,
  ],
  templateUrl: "./employee.component.html",
  styleUrl: "./employee.component.css",
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  constructor(private graphqlService: GraphqlService) {}

  displayedColumns: string[] = [
    "first_name",
    "last_name",
    "designation",
    "department",
  ];

  viewDetails(employee: Employee) {
    console.log(employee);
  }

  editEmployee(employee: Employee) {
    console.log("edit button");
  }

  deleteEmployee(employee: Employee) {
    console.log("delete button");
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
        console.error("Error loading employees", error);
      },
    });
  }
}

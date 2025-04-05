import { Component } from "@angular/core";
import { GraphqlService } from "../network/graphql.service";

@Component({
  selector: "app-employee",
  imports: [],
  templateUrl: "./employee.component.html",
  styleUrl: "./employee.component.css",
})
export class EmployeeComponent {
  constructor(private graphqlService: GraphqlService) {}

  onLoad() {
    return this.graphqlService.getAllEmployees().subscribe({
      next: (employees) => {
        console.log(employees);
      },
    });
  }
}

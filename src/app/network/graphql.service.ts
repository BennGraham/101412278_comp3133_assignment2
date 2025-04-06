import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  private apiUrl =
    'https://one01412278-comp3133-assignment1.onrender.com/graphql';

  constructor(private apollo: Apollo) {}

  login(username: string, password: string): Observable<User> {
    return this.apollo
      .query<{ login: User }>({
        query: gql`
          query Login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
              id
              username
            }
          }
        `,
        variables: {
          username,
          password,
        },
      })
      .pipe(map((result) => result.data!.login));
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.apollo
      .query<{ employees: Employee[] }>({
        query: gql`
          query GetAllEmployees {
            employees {
              id
              first_name
              last_name
              email
              gender
              designation
              salary
              joined_date
              department
              photo
            }
          }
        `,
        variables: {},
      })
      .pipe(map((result) => result.data!.employees));
  }

  signup(username: string, email: string, password: string): Observable<User> {
    return this.apollo
      .mutate<{ signup: User }>({
        mutation: gql`
          mutation Signup(
            $username: String!
            $email: String!
            $password: String!
          ) {
            signup(username: $username, email: $email, password: $password) {
              id
              username
              email
            }
          }
        `,
        variables: {
          username,
          email,
          password,
        },
      })
      .pipe(map((result) => result.data!.signup));
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.apollo
      .mutate<{ updateEmployee: Employee }>({
        mutation: gql`
          mutation UpdateEmployee(
            $employeeId: ID!
            $updates: EmployeeUpdateRequest!
          ) {
            updateEmployee(employeeId: $employeeId, updates: $updates) {
              id
              first_name
              last_name
              email
              gender
              designation
              salary
              joined_date
              department
              photo
            }
          }
        `,
        variables: {
          employeeId: employee.id,
          updates: {
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            gender: employee.gender,
            designation: employee.designation,
            department: employee.department,
            salary: employee.salary,
            photo: employee.photo,
          },
        },
      })
      .pipe(map((result) => result.data!.updateEmployee));
  }

  addEmployee(
    employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>
  ): Observable<Employee> {
    return this.apollo
      .mutate<{ addEmployee: Employee }>({
        mutation: gql`
          mutation AddEmployee($employee: EmployeeCreateRequest!) {
            addEmployee(employee: $employee) {
              id
              first_name
              last_name
              email
              gender
              designation
              salary
              joined_date
              department
              photo
            }
          }
        `,
        variables: {
          employee: {
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            gender: employee.gender,
            designation: employee.designation,
            salary: employee.salary,
            joined_date: employee.joined_date,
            department: employee.department,
            photo: employee.photo,
          },
        },
      })
      .pipe(map((result) => result.data!.addEmployee));
  }

  deleteEmployee(id: string): Observable<Employee> {
    return this.apollo
      .mutate<{ deleteEmployee: Employee }>({
        mutation: gql`
          mutation DeleteEmployee($id: ID!) {
            deleteEmployee(id: $id) {
              id
              first_name
              last_name
              email
              gender
              designation
              salary
              joined_date
              department
              photo
            }
          }
        `,
        variables: {
          id,
        },
      })
      .pipe(map((result) => result.data!.deleteEmployee));
  }
}

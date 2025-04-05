export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: 'M' | 'F' | 'Other';
  designation: string;
  salary: number;
  joined_date: Date;
  department: string;
  photo?: string;
}

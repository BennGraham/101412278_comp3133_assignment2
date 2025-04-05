export interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: "M" | "F" | "Other";
  designation: string;
  salary: number;
  joined_date: Date;
  department: string;
  photo?: string;
}

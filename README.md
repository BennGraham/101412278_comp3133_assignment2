# 101412278Comp3133Assignment2

## Start here:
Clone this repo
```bash 
git clone https://github.com/BennGraham/101412278_comp3133_assignment2
```
Navigate to the project
```bash
cd 101412278_comp3133_assignment2
```
Install packages
```bash
npm install
```
Run local dev server *note: this is only the frontend, no database access.
```bash
ng serve
```

# How to use:
Sign up using your email address and password

or  
    
Login using an existing user account  

Once authenticated, you will be redirected to /employee, which will display a list of all employees in the database table.
- Note: The first load can take as long as 50 seconds if the backend has been inactive, a restriction of the backend host (Render)

Clicking the log out button (top header when authenticated) will remove the stored session token, and return to the home page.

## Employee List
**Add Employee**:Click '+ Add Employe' to create a new employee by filling out the new employee form. Photo is not required, minimum salary is $1,000.  
**View Details**: Click on an employee to bring up a dialog to view their details.   
**Update Employee**: Inside the details dialog, click the pencil icon to edit the employee details.  
**Delete Employee**: Hover a row of the employee table to show the delete button (trash can) for that employee. Click the button, and confirm deletion to delete an employee.  



import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/classes/employee';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  allEmployees: Employee[];
  statusCode: number;
  requestProcessing = false;
  employeeIdToUpdate = null;
  processValidation = false;
  employeeForm: FormGroup;

  constructor(private addEmployeeService: EmployeeService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(){
    this.employeeForm = this.fb.group({
      name: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.pattern("^[a-z A-Z]*$") ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      location: new FormControl('', [Validators.required, Validators.minLength(3)]),
      mobile: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(10),       Validators.minLength(10)])
    });
  }

  getAllEmployees(){
    this.addEmployeeService.getAllEmployees().subscribe(
      data => this.allEmployees = data,
      errorCode => this.statusCode = errorCode
    );
  }

  addEmployeeSubmit(){
    console.log(this.employeeForm);
    this.processValidation = true;
    if(this.employeeForm.invalid){
        return;
    }
    this.pre_process_configurations();
    let emp = this.employeeForm.value;
    if(this.employeeIdToUpdate === null){
      this.addEmployeeService.getAllEmployees().subscribe(
        employee => {
          let maxIndex = employee.length - 1;
					let employeeWithMaxIndex = employee[maxIndex];
					let employeeId = employeeWithMaxIndex.id + 1;
          emp.id = employeeId;

          this.addEmployeeService.addEmployee(emp).subscribe(statusCode => {
            this.statusCode = statusCode;
            this.getAllEmployees();
            this.router.navigate(['/employees']);
          },
            errorCode => this.statusCode = errorCode
          );
          
        });
    }
  }
  pre_process_configurations() {
    this.statusCode = null;
		this.requestProcessing = true;
  }

}

import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/classes/employee';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  allEmployees: Employee[];
  editEmployeeForm: FormGroup;
  id: number;
  
  constructor(private updateEmployeeService: EmployeeService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    
    this.updateEmployeeService.getEmployeeById(this.id).subscribe(
      (data: any) => {
        this.allEmployees = data;
        
        this.editEmployeeForm = this.fb.group({
          name: new FormControl(this.allEmployees['name'], [ Validators.required, Validators.minLength(3), Validators.pattern("^[a-z A-Z]*$") ]),
          email: new FormControl(this.allEmployees['email'], [Validators.required, Validators.email]),
          location: new FormControl(this.allEmployees['location'], [Validators.required, Validators.minLength(3)]),
          mobile: new FormControl(this.allEmployees['mobile'], [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(10), Validators.minLength(10)])
        });
      });
  }

  updateEmployee(editEmployeeForm: FormGroup){
    const emp = {
      id: this.allEmployees['id'], 
      name: editEmployeeForm.value.name,
      location: editEmployeeForm.value.location,
      email: editEmployeeForm.value.email,
      mobile: editEmployeeForm.value.mobile
    }

    this.updateEmployeeService.updateEmployee(emp).subscribe(
      (data: any) => {
      });
      this.router.navigate(['/employees']);
  }

}

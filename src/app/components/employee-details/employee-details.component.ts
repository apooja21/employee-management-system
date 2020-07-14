import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/classes/employee';
import { EmployeeService } from 'src/app/employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  employee: Employee;
  id: number;

  constructor(private employeeDetailService: EmployeeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(){
    this.id = this.route.snapshot.params['id'];

    this.employeeDetailService.getEmployeeById(this.id).subscribe(data => {this.employee = data;}
    );
  }

  goback(){
    this.router.navigate(['/employees']);

  }


}

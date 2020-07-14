import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/classes/employee';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  allEmployees: Employee[];
  statusCode: number;
  requestProcessing = false;
  termfilter: string;

  constructor(private employeeListService: EmployeeService) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(){
    this.employeeListService.getAllEmployees().subscribe(
      data => this.allEmployees = data,
      errorCode => this.statusCode = errorCode);
  }

  deleteEmployee(employeeId: string){
    this.pre_process_configurations();
    this.employeeListService.deleteEmployeeById(employeeId).subscribe(
      statusCode => {
        this.statusCode = 204;
        this.getAllEmployees();
      },
      errorCode => this.statusCode = errorCode
    );
  }
  pre_process_configurations() {
    this.statusCode = null;
		this.requestProcessing = true;
  }

}

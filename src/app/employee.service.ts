import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Employee } from './classes/employee';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeeUrl = '/api/employees';
  //employees: Employee[];
  constructor(private http: HttpClient) { }

  // Fetch all Employees
  getAllEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.employeeUrl).pipe(
      tap(empl => console.log('Number of employees: ' + empl.length)),
      catchError(this.handleError)
    );
  }

  // Fetch employee by Id
  getEmployeeById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(this.employeeUrl + '/' + employeeId).pipe(
        tap(empl => console.log(empl.id + ' ' + empl.name + ' ' + empl.location + ' ' + empl.email + ' ' + empl.mobile)),
        catchError(this.handleError)
    );
  }

  // Add Employee
  addEmployee(empl: Employee): Observable<number> {
    const httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    return this.http.post<Employee>(this.employeeUrl + '/' + empl.id, empl, {
        headers: httpHeaders,
        observe: 'response'
    }
    ).pipe(
        map(res => res.status),
        catchError(this.handleError)
    );
  }

  // Update Employee
  updateEmployee(empl: Employee): Observable<number> {
    const httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    return this.http.put<Employee>(this.employeeUrl + '/' + empl.id, empl, {
        headers: httpHeaders,
        observe: 'response'
    }
    ).pipe(
        map(res => res.status),
        catchError(this.handleError)
    );
  }

  // Delete Employee
  deleteEmployeeById(employeeId: string): Observable<number> {
    return this.http.delete<number>(this.employeeUrl + '/' + employeeId).pipe(
        tap(status => console.log('status: ' + status)),
        catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department.model';
import { DepartmentsService } from 'src/app/services/departments.service';
import Swal from 'sweetalert2';
/**
 * Departments child component
 */
@Component({
  selector: 'app-departments-child',
  templateUrl: './departments-child.component.html',
  styleUrls: ['./departments-child.component.scss']
})
export class DepartmentsChildComponent implements OnInit {
  /** Input variable to get the department */
  @Input() department: Department;
  /**
   * Constructor
   * @param departmentsService 
   * @param router 
   */
  constructor(private departmentsService: DepartmentsService, private router: Router) { }
  /**
   * Navigates to the department form with the ID
   * @param department Department object
   */
  editDepartment(department: Department) {
    this.router.navigate(['edit-department', department.id]);
  }
  /**
   * Deletes a department calling the service after the confirmation
   * @param department Department object
   */
  deleteDepartment(department: Department) {
    const this_ = this;
    Swal.fire({
      title: "Are you sure?", text: "You will not be able to recover it!", icon: "warning", showDenyButton: true, denyButtonText: `No please`, confirmButtonText: `Sure`
    }).then(function(result) {
      if (result.isConfirmed) {
        this_.departmentsService.deleteDepartment(department.id).then(() => {
          Swal.fire('Deleted', 'Department deleted', 'success');
        }).catch(err => {
          Swal.fire('Error', err.message, 'error');
        })
      }
    })
  }
  /** OnInit life cycle */
  ngOnInit(): void { }

}

import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../../../models/employee.model';
import { Department } from '../../../models/department.model';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  @Input() employee: Employee;
  @Input() department: Department;
  @Input() editable: boolean;
  
  constructor() { }

  ngOnInit(): void {
  }

}

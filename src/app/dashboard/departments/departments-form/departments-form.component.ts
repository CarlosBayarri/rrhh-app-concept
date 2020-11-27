import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import Swal from 'sweetalert2';
import { DepartmentsService } from '../../../services/departments.service';
import * as actions from '../../../store/actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../../models/department.model';
/**
 * Departments form component
 */
@Component({
  selector: 'app-departments-form',
  templateUrl: './departments-form.component.html',
  styleUrls: ['./departments-form.component.scss']
})
export class DepartmentsFormComponent implements OnInit, OnDestroy {
  /** ID from department */
  public id: string;
  /** Form group */
  public departmentForm: FormGroup;
  /** Loading variable for the UI state */
  public loading: boolean = false;
  /** loading subscription */
  public loadingSubscription: Subscription;
  /** Departments subscription */
  public departmentsSubscription: Subscription;
  /** Active routing subscription */
  private activeRoutingSubscription: Subscription;
  /**
   * Constructor
   * @param fb 
   * @param departmentsService 
   * @param store APP store
   * @param router 
   * @param route 
   */
  constructor(private fb: FormBuilder, private departmentsService: DepartmentsService, private store: Store<AppState>, private router: Router, private route: ActivatedRoute) { }
  /**
   * Saves the department data, creating a new one or modifying the existing one
   */
  save() {
    if (this.departmentForm.invalid) return;
    const {name} = this.departmentForm.value;
    let department;
    this.store.dispatch(actions.isLoading());
    if (this.id) {
      department = new Department(name, this.id);
      this.departmentsService.modifyDepartment(department).then(() => {
        Swal.fire('Department modified', department.name, 'success');
        this.store.dispatch(actions.stopLoading());
        this.departmentForm.reset();
        this.router.navigate(['/']);
      }).catch(err => {
        this.store.dispatch(actions.stopLoading());
        Swal.fire('Error', err, 'error');
      });
    } else {
      department = new Department(name);
      this.departmentsService.createDepartment(department).then(() => {
        Swal.fire('Department created', department.name, 'success');
        this.store.dispatch(actions.stopLoading());
        this.departmentForm.reset();
        this.router.navigate(['/']);
      }).catch(err => {
        this.store.dispatch(actions.stopLoading());
        Swal.fire('Error', err, 'error');
      });
    }
  }
  /** OnInit life cycle */
  ngOnInit() {
    this.loadingSubscription = this.store.select('ui').subscribe(({isLoading}) => this.loading = isLoading);
    this.departmentForm = this.fb.group({
      name: ['', Validators.required]
    })
    this.activeRoutingSubscription = this.route.params.subscribe(params => {
      this.id = params['id']; 
      this.departmentsSubscription = this.store.select('departments').subscribe(({departments}) => 
        departments.map(department => { if (department.id === this.id) {
            this.departmentForm.setValue({name: department.name});
        }})
      );
    });
  }
  /** OnDestroy life cycle */
  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
    this.departmentsSubscription.unsubscribe();
    this.activeRoutingSubscription.unsubscribe();
  }

}

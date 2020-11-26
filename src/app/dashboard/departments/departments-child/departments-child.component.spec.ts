import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsChildComponent } from './departments-child.component';

describe('DepartmentsChildComponent', () => {
  let component: DepartmentsChildComponent;
  let fixture: ComponentFixture<DepartmentsChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentsChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentsChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

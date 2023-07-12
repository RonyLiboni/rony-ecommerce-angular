import { Component } from '@angular/core';
import { Category } from 'src/app/domain/models/department-hierarchy/Category';
import { Department } from 'src/app/domain/models/department-hierarchy/Department';
import { SubDepartment } from 'src/app/domain/models/department-hierarchy/SubDepartment';
import { DepartmentService } from 'src/app/domain/services/department-hierarchy/department.service';

@Component({
  selector: 'app-department-hierarchy-management',
  templateUrl: './department-hierarchy-management.component.html',
  styleUrls: ['./department-hierarchy-management.component.css'],
})
export class DepartmentHierarchyManagementComponent {
  departments: Department[] = [];
  department: Department = new Department();
  departmentName: string = 'computers';

  constructor(private readonly departmentService: DepartmentService) {}

  public ngOnInit(): void {
    this.getAllDepartments();
    this.getDepartmentByName(this.departmentName);
  }

  private getAllDepartments(): void {
    this.departmentService.getAll().subscribe((departments: Department[]) => {
      this.departments = departments;
    });
  }

  public getDepartment(): void {
    this.department = this.getDepartmentInCachedList();
  }

  private getDepartmentInCachedList(): Department {
    return (
      this.departments.find((d) =>
        d.name.toLowerCase().includes(this.departmentName.toLowerCase())
      ) ?? this.returnErrorWithEmptyDepartment()
    );
  }

  private returnErrorWithEmptyDepartment(): Department {
    return this.buildEmptyDepartment();
  }

  public getDepartmentByName(name: string): void {
    this.departmentService.getBy(name).subscribe({
      next: (department: Department) => {
        this.department = department;
        this.getAllDepartments();
      },
      error: (error) => {
        this.buildEmptyDepartment();
      },
    });
  }

  public getDepartmentRowSize(department: Department): number {
    return department.subDepartments.reduce((count, subDepartment) => {
      return count + subDepartment.categories.length;
    }, 0);
  }

  public getSubDepartmentRowSize(subDepartment: SubDepartment): number {
    return subDepartment.categories.length;
  }

  public openDepartmentFormToCreate(): void {}

  public openDepartmentFormToEdit(): void {}

  public openSubDepartmentFormToCreate(): void {}

  public openSubDepartmentFormToEdit(subDepartment: SubDepartment): void {}

  public openCategoryFormToEdit(
    category: Category,
    subDepartment: SubDepartment
  ): void {}

  public buildEmptyDepartment(): Department {
    this.department = new Department();
    return this.department;
  }

  public formSubmittedSuccessfully(departmentName: string) {
    this.getDepartmentByName(departmentName);
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CategoryFormComponent } from 'src/app/components/department-hierarchy/category/category-form/category-form.component';
import { DepartmentFormComponent } from 'src/app/components/department-hierarchy/department/department-form/department-form.component';
import { SubDepartmentFormComponent } from 'src/app/components/department-hierarchy/subdepartment/subdepartment-form/subdepartment-form.component';
import { Category } from 'src/app/domain/models/department-hierarchy/Category';
import { Department } from 'src/app/domain/models/department-hierarchy/Department';
import { SubDepartment } from 'src/app/domain/models/department-hierarchy/SubDepartment';
import { DepartmentService } from 'src/app/domain/services/department-hierarchy/department.service';

@Component({
  selector: 'app-department-hierarchy-management',
  templateUrl: './department-hierarchy-management.component.html',
  styleUrls: ['./department-hierarchy-management.component.css'],
})
export class DepartmentHierarchyManagementComponent implements OnInit {
  departments: Department[] = [];
  department: Department = new Department();
  departmentName: string = 'computers';
  dialog: MatDialog;

  constructor(private readonly departmentService: DepartmentService,
              dialog: MatDialog) {
    this.dialog = dialog;
  }

  public ngOnInit(): void {
    this.getAllDepartments();
    this.getDepartmentByName(this.departmentName);
  }

  private getAllDepartments(): void {
    this.departmentService.getAll()
    .subscribe({
      next: (departments: Department[]) => {
        this.departments = departments;
      },
      error: (error) => {
        this.department = this.buildEmptyDepartment();
      },
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
    this.departmentService.getBy(name)
    .subscribe({
      next: (department: Department) => {
        this.department = this.fillEmptyObjects(department);
        this.getAllDepartments();
      },
      error: (error) => {
        this.department = this.buildEmptyDepartment();
      },
    });
  }

  private fillEmptyObjects(department: Department): Department {
    department.subDepartments.forEach((subDepartment) => {
      if (subDepartment.categories === null || subDepartment.categories.length == 0) {
        subDepartment.categories = [new Category()];
      }
    });
    if (department.subDepartments === null || department.subDepartments.length == 0) {
      department.subDepartments = [new SubDepartment()];
      return department;
    }

    return department;
  }

  public getDepartmentRowSize(department: Department): number {
    return department.subDepartments
      .reduce((rowSize, subDepartment) => { return rowSize + subDepartment.categories.length;}, 0);
  }

  public getSubDepartmentRowSize(subDepartment: SubDepartment): number {
    return subDepartment.categories.length;
  }

  public openDepartmentForm(department: Department): void {
    const dialogRef: MatDialogRef<DepartmentFormComponent> = this.dialog.open(
      DepartmentFormComponent,
      {
        data: department,
      }
    );
    dialogRef.afterClosed().subscribe((departmentName) => {
      if (departmentName) {
        this.formSubmittedSuccessfully(departmentName);
      }
    });
  }

  public openSubDepartmentForm(subDepartment: SubDepartment): void {
    const dialogRef: MatDialogRef<SubDepartmentFormComponent> = this.dialog.open(
      SubDepartmentFormComponent,
      {
        data: {
                departments: this.departments,
                department : this.department,
                subDepartment: subDepartment
              }
      }
    );
    dialogRef.afterClosed()
      .subscribe((departmentName) => {
        if (departmentName) {
          this.formSubmittedSuccessfully(departmentName);
        }
      });
  }

  public openCategoryForm(category: Category, subDepartment: SubDepartment): void {
    const dialogRef: MatDialogRef<CategoryFormComponent> = this.dialog.open(
      CategoryFormComponent,
      {
        data: {
                departments: this.departments,
                category : category,
                subDepartment: subDepartment
              }
      }
    );

    dialogRef.afterClosed()
      .subscribe((departmentName) => {
        if (departmentName) {
          this.formSubmittedSuccessfully(departmentName);
        }
      });
  }

  public buildEmptyDepartment(): Department {
    return new Department();
  }

  public buildEmptySubDepartment(): SubDepartment {
    return new SubDepartment();
  }

  public buildEmptyCategory(): Category {
    return new Category();
  }

  private formSubmittedSuccessfully(departmentName: string) {
    this.getDepartmentByName(departmentName);
  }
}

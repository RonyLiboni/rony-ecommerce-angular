import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyErrorStateMatcher } from 'src/app/components/shared/MyErrorStateMatcher';
import { Category } from 'src/app/domain/models/department-hierarchy/Category';
import { Department } from 'src/app/domain/models/department-hierarchy/Department';
import { SubDepartment } from 'src/app/domain/models/department-hierarchy/SubDepartment';
import { CategoryService } from 'src/app/domain/services/department-hierarchy/category.service';

interface CategoryFormProperties{
  departments: Department[],
  category: Category,
  subDepartment: SubDepartment
}

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent {
  dialogRef: MatDialogRef<CategoryFormComponent>;
  formControl: FormGroup;
  errorMessage: string = '';
  matcher = new MyErrorStateMatcher();
  departments: Department[];
  subDepartments: SubDepartment[] = [];

  constructor(dialogRef: MatDialogRef<CategoryFormComponent>,
              @Inject(MAT_DIALOG_DATA) formProperties: CategoryFormProperties,
              private readonly categoryService: CategoryService,
              private readonly formBuilder: FormBuilder) {
    this.departments = formProperties.departments;
    this.updateSubDepartments();
    this.dialogRef = dialogRef;
    this.formControl = this.buildForm();
    this.setInitialProperties(formProperties.category, formProperties.subDepartment);
  }

  private updateSubDepartments(): void{
    this.departments.forEach(d=> this.subDepartments.push(...d.subDepartments));
  }

  protected buildForm() {
    return this.formBuilder.group({
      id: [0, Validators.required],
      name: ['', [Validators.required,
                  Validators.minLength(3),
                  Validators.maxLength(50),
                  Validators.pattern(/^(?!\s*$)(?=(.*\S){3}).*$/)
                  ]
            ],
      subDepartment: {
                       id: [0, [Validators.required]]
                     }
    });
  }

  private setInitialProperties(category: Category, subDepartment : SubDepartment): void {
    this.formControl.patchValue({
      id: category.id,
      name: category.name,
      subDepartment: {
                    id: subDepartment.id
                  }
    });
  }

  public save(): void {
    if (this.formControl.value.id === 0) {
      this.create();
      return;
    }
    this.edit();
  }

  private create(): void {
    this.categoryService.create(this.formControl.value).subscribe({
      next: (empty) => {
        this.dialogRef.close(this.getDepartmentName());
      },
      error: (error) => {
        this.errorMessage = error.error.detail;
      },
    });
  }

  private edit(): void {
    this.categoryService.edit(this.formControl.value).subscribe({
      next: (empty) => {
        this.dialogRef.close(this.getDepartmentName());
      },
      error: (error) => {
        this.errorMessage = error.error.detail;
      },
    });
  }

  private getDepartmentName(): string{
    return this.departments
          .filter(d=> this.doesSubDepartmentIdExists(d.subDepartments))
          .pop()!
          .name ?? 'error';
  }

  private doesSubDepartmentIdExists(subDepartments: SubDepartment[]): boolean{
    return subDepartments.some(s => s.id == this.formControl.value.subDepartment.id);
  }

  public isDisabled() {
    return this.formControl.status === 'INVALID';
  }
}

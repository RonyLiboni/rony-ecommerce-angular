import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyErrorStateMatcher } from 'src/app/components/shared/MyErrorStateMatcher';
import { Department } from 'src/app/domain/models/department-hierarchy/Department';
import { SubDepartment } from 'src/app/domain/models/department-hierarchy/SubDepartment';
import { SubDepartmentService } from 'src/app/domain/services/department-hierarchy/sub-department.service';

interface SubDepartmentFormProperties{
  departments: Department[],
  department: Department,
  subDepartment: SubDepartment
}

@Component({
  selector: 'app-subdepartment-form',
  templateUrl: './subdepartment-form.component.html',
  styleUrls: ['./subdepartment-form.component.css']
})
export class SubDepartmentFormComponent {
  dialogRef: MatDialogRef<SubDepartmentFormComponent>;
  formControl: FormGroup;
  errorMessage: string = '';
  matcher = new MyErrorStateMatcher();
  departments: Department[];

  constructor(dialogRef: MatDialogRef<SubDepartmentFormComponent>,
              @Inject(MAT_DIALOG_DATA) formProperties: SubDepartmentFormProperties,
              private readonly subDepartmentService: SubDepartmentService,
              private readonly formBuilder: FormBuilder) {
    this.departments = formProperties.departments;
    this.dialogRef = dialogRef;
    this.formControl = this.buildForm();
    this.setInitialProperties(formProperties.subDepartment, formProperties.department);
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
      department: {
                    id: [0, [Validators.required]]
                  }
    });
  }

  private setInitialProperties(subDepartment: SubDepartment, department : Department): void {
    this.formControl.patchValue({
      id: subDepartment.id,
      name: subDepartment.name,
      department: {
                    id: department.id
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
    this.subDepartmentService.create(this.formControl.value).subscribe({
      next: (empty) => {
        this.dialogRef.close(this.getDepartmentName());
      },
      error: (error) => {
        this.errorMessage = error.error.detail;
      },
    });
  }

  private edit(): void {
    this.subDepartmentService.edit(this.formControl.value).subscribe({
      next: (empty) => {
        this.dialogRef.close(this.getDepartmentName());
      },
      error: (error) => {
        this.errorMessage = error.error.detail;
      },
    });
  }

  private getDepartmentName(): string{
    return this.departments.find(d=> d.id == this.formControl.value.department.id)?.name ?? 'error';
  }

  public isDisabled() {
    return this.formControl.status === 'INVALID';
  }

}

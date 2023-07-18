import { Component, Inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MyErrorStateMatcher } from 'src/app/components/shared/MyErrorStateMatcher';
import { Department } from 'src/app/domain/models/department-hierarchy/Department';
import { DepartmentService } from 'src/app/domain/services/department-hierarchy/department.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css'],
})
export class DepartmentFormComponent {
  errorMessage: string = '';
  matcher = new MyErrorStateMatcher();
  dialogRef: MatDialogRef<DepartmentFormComponent>;
  departmentForm: FormGroup;

  constructor(
              dialogRef: MatDialogRef<DepartmentFormComponent>,
              @Inject(MAT_DIALOG_DATA) department: Department,
              private readonly departmentService: DepartmentService,
              private readonly formBuilder: FormBuilder) {
    this.dialogRef = dialogRef;
    this.departmentForm = this.buildForm();
    this.setInitialProperties(department);
  }

  protected buildForm() {
    return this.formBuilder.group({
      name: [ null, [Validators.required,
                     Validators.maxLength(50),
                     Validators.pattern(/^(?!\s*$)(?=(.*\S){3}).*$/),
                    ],
            ],
      id: [0, Validators.required],
    });
  }

  private setInitialProperties(department: Department): void {
    this.departmentForm.patchValue({
      name: department.name,
      id: department.id,
    });
  }

  public save(): void {
    if (this.departmentForm.value.id === 0) {
      this.create();
      return;
    }
    this.edit();
  }

  private create(): void {
    this.departmentService.create(this.departmentForm.value).subscribe({
      next: (empty) => {
        this.dialogRef.close(this.departmentForm.value.name);
      },
      error: (error) => {
        this.errorMessage = error.error.detail;
      },
    });
  }

  private edit(): void {
    this.departmentService.edit(this.departmentForm.value).subscribe({
      next: (empty) => {
        this.dialogRef.close(this.departmentForm.value.name);
      },
      error: (error) => {
        this.errorMessage = error.error.userMessage;
      },
    });
  }

  public isDisabled() {
    return this.departmentForm.status === 'INVALID';
  }
}

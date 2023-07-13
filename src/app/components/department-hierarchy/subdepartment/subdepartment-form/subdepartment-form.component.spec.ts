import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDepartmentFormComponent } from './subdepartment-form.component';

describe('SubdepartmentFormComponent', () => {
  let component: SubDepartmentFormComponent;
  let fixture: ComponentFixture<SubDepartmentFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubDepartmentFormComponent]
    });
    fixture = TestBed.createComponent(SubDepartmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

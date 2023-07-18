import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentHierarchyManagementComponent } from './department-hierarchy-management.component';

describe('DepartmentHierarchyManagementComponent', () => {
  let component: DepartmentHierarchyManagementComponent;
  let fixture: ComponentFixture<DepartmentHierarchyManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmentHierarchyManagementComponent]
    });
    fixture = TestBed.createComponent(DepartmentHierarchyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

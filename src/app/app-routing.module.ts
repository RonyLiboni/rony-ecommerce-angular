import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentHierarchyManagementComponent } from './views/department-hierarchy-management/department-hierarchy-management.component';

const routes: Routes = [
  { path: '', component: DepartmentHierarchyManagementComponent },
  {
    path: 'management/department-hierarchy',
    component: DepartmentHierarchyManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

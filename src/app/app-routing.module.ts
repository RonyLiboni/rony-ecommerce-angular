import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentHierarchyManagementComponent } from './views/department-hierarchy-management/department-hierarchy-management.component';
import { ProductManagementComponent } from './views/product-management/product-management.component';

const routes: Routes = [
  {
    path: 'management/department-hierarchy',
    component: DepartmentHierarchyManagementComponent,
  },
  {
    path: 'management/products',
    component: ProductManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

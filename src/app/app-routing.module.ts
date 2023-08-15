import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentHierarchyManagementComponent } from './views/department-hierarchy-management/department-hierarchy-management.component';
import { ProductManagementComponent } from './views/product-management/product-management.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';

const routes: Routes = [
  {
    path: 'management/department-hierarchy',
    component: DepartmentHierarchyManagementComponent,
  },
  {
    path: 'management/products',
    component: ProductManagementComponent,
  },
  {
    path: 'management/products/form/:id',
    component: ProductFormComponent
  },
  {
    path: 'management/products/form',
    component: ProductFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

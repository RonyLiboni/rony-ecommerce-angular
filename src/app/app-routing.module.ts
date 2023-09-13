import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentHierarchyManagementComponent } from './views/department-hierarchy-management/department-hierarchy-management.component';
import { ProductManagementComponent } from './views/product-management/product-management.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { CustomerProductSearchComponent } from './views/customer-product-search/customer-product-search.component';
import { CustomerProductDetailViewComponent } from './views/customer-product-detail-view/customer-product-detail-view.component';

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
  },
  {
    path: '',
    component: CustomerProductSearchComponent
  },
  {
    path: 'product-details/:id',
    component: CustomerProductDetailViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

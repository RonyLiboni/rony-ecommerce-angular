import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DepartmentHierarchyManagementComponent } from './views/department-hierarchy-management/department-hierarchy-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { DepartmentFormComponent } from './components/department-hierarchy/department/department-form/department-form.component';
import { SubDepartmentFormComponent } from './components/department-hierarchy/subdepartment/subdepartment-form/subdepartment-form.component';
import { CategoryFormComponent } from './components/department-hierarchy/category/category-form/category-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FooterComponent } from './components/header-footer/footer/footer.component';
import { HeaderComponent } from './components/header-footer/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProductManagementComponent } from './views/product-management/product-management.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { ProductImageFormComponent } from './components/products/product-image-form/product-image-form.component';
import { CustomerProductSearchComponent } from './views/customer-product-search/customer-product-search.component';
import {MatBadgeModule} from '@angular/material/badge';
import { CustomerProductDetailViewComponent } from './views/customer-product-detail-view/customer-product-detail-view.component';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentHierarchyManagementComponent,
    DepartmentFormComponent,
    SubDepartmentFormComponent,
    CategoryFormComponent,
    FooterComponent,
    HeaderComponent,
    ProductManagementComponent,
    ProductFormComponent,
    ProductImageFormComponent,
    CustomerProductSearchComponent,
    CustomerProductDetailViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

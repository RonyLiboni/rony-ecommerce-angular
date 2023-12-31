import { HttpParams } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { merge} from 'rxjs';
import { debounceTime, startWith, switchMap } from 'rxjs/operators';
import { Product } from 'src/app/domain/models/product/Product';
import { ProductService } from 'src/app/domain/services/product/product.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css'],
})
export class ProductManagementComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'SKU',
    'name',
    'price',
    'category',
    'actions',
  ];
  products!: Product[];
  resultsLength = 0;
  isLoadingResults = true;
  queryControl = new FormControl();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _productService: ProductService) {}

  ngAfterViewInit() {
    this.resetPageNumber();
    merge(this.sort.sortChange, this.paginator.page, this.queryControl.valueChanges)
      .pipe(
            debounceTime(250),
            startWith({}),
            switchMap(() => {
              this.isLoadingResults = true;
              return this._productService.getBySku(this.buildQueryHttpParams());
        }))
      .subscribe((products) => {
        this.isLoadingResults = false;
        this.resultsLength = products.totalCount;
        this.products = products.body;
      });
  }

  private resetPageNumber(): void{
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.queryControl.valueChanges.subscribe(() => (this.paginator.pageIndex = 0));
  }

  private buildQueryHttpParams(): HttpParams{
    let params = new HttpParams();
    params = params.append("pageNumber", this.paginator.pageIndex + 1);
    params = params.append("pageSize", this.paginator.pageSize.toString());
    params = params.append("sort", this.sort.direction);
    params = params.append("sku", this.queryControl.value ? this.queryControl.value : "");
    return params;
  }

}


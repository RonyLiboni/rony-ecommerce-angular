import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductImage } from 'src/app/domain/models/product/Product';
import { CustomerSearchService } from 'src/app/domain/services/customer-search/customer-search.service';
import { ProductService } from 'src/app/domain/services/product/product.service';

@Component({
  selector: 'app-customer-product-detail-view',
  templateUrl: './customer-product-detail-view.component.html',
  styleUrls: ['./customer-product-detail-view.component.css']
})
export class CustomerProductDetailViewComponent implements OnInit{

  product!: Product;
  imageBeingPresented!: ProductImage;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(private readonly _productService: ProductService,
              private readonly _customerSearchService: CustomerSearchService,
              private readonly _activatedRoute: ActivatedRoute,
              private readonly _router: Router){}

  public ngOnInit(): void {
    const id = Number(this._activatedRoute.snapshot.paramMap.get('id'));
    if(id){
      this._productService.getById(id).subscribe(product => {
          this.product = product;
          this.addSubDepartmentAndDepartment();
          this.imageBeingPresented = product.images[0];
        });
    }
  }

  public getHomeUrl(): void{
    this._router.navigate(['']);
  }

  public getQueryUrl(fieldName: string, value:string): void{
    const queryParams = {
      fieldName: fieldName,
      value: value
    };
    this._router.navigate([''], {
      queryParams: queryParams
    });
  }

  public scroll(scrollSize: number) {
    this.scrollContainer.nativeElement.scrollTop += scrollSize;
  }

  public sendToBePresented(image: ProductImage): void{
    this.imageBeingPresented = image;
  }

  public addSubDepartmentAndDepartment():void{
    let params = new HttpParams();
    params = params.append("categoriesDTO", this.product.category.name);
    this._customerSearchService.getProductSearchFilters(params)
                                .subscribe(filters => {
                                  this.product.subDepartment = filters.subDepartments[0];
                                  this.product.department = filters.departments[0];
                                });
  }

  public notImplemented(): void{
    alert('Not implemented yet');
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../shared/MyErrorStateMatcher';
import { ProductService } from 'src/app/domain/services/product/product.service';
import { Category } from 'src/app/domain/models/department-hierarchy/Category';
import { Product } from 'src/app/domain/models/product/Product';
import { CategoryService } from 'src/app/domain/services/department-hierarchy/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductImageFormComponent } from '../product-image-form/product-image-form.component';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit{
  formControl!: FormGroup;
  errorMessage: string = '';
  matcher = new MyErrorStateMatcher();
  categories: Category[] = [];
  product: Product = new Product();
  dialog: MatDialog;
  isLoadingResult: boolean = false;

  constructor(private readonly _productService: ProductService,
              private readonly _categoryService: CategoryService,
              private readonly _activatedRoute: ActivatedRoute,
              private readonly _router: Router,
              private readonly _formBuilder: FormBuilder,
              dialog: MatDialog
            ) {
    this.dialog = dialog;
  }

  public ngOnInit(): void {
    this._categoryService.getAll()
                          .subscribe(c => this.categories = c);
    this.formControl = this.buildForm();
    this.setFormValuesIfIdWasSent();
    this.formControl.statusChanges.subscribe(c=> {
      console.log(c);
      console.log(this.formControl);
    })
  }

  private buildForm() {
    return this._formBuilder.group({
      id: [0],
      name: ['', [Validators.required,
                  Validators.minLength(3),
                  Validators.maxLength(150),
                  Validators.pattern(/^(?!\s*$)(?=(.*\S){3}).*$/)
                  ]
            ],
      sku: [null, [Validators.required,
                 Validators.minLength(4),
                 Validators.maxLength(36),
                 Validators.pattern(/^(?!\s*$)(?=(.*\S){4}).*$/)
                  ]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required,
                          Validators.minLength(5),
                          Validators.maxLength(255),
                          Validators.pattern(/^(?!\s*$)(?=(.*\S){5}).*$/)
                          ]],
      category: [null, Validators.required]
    });
  }

  private setFormValuesIfIdWasSent(): void{
    const id = Number(this._activatedRoute.snapshot.paramMap.get('id'));
    if(id){
      this._productService.getById(id)
                          .subscribe({
                            next: (p) => {
                              this.product = p;
                              this.setInitialProperties(p);
                            },
                            error: (error) => {
                              this.errorMessage = error.error.validationErrors[0].userMessage ?? error.error.detail;
                            },
                          });

    }
  }

  private setInitialProperties(product: Product): void {
    this.formControl.patchValue({
      id: product.id,
      name: product.name,
      sku: 'CANNOT EDIT SKU',
      price: product.price,
      category: product.category,
      description: product.description
    });
  }

  public save(): void {
    if (this.product.id) {
      this.edit();
      return;
    }
    this.create();
  }

  private create(): void {
    this.isLoadingResult = true;
    this._productService.create(this.formControl.value).subscribe({
      next: (response) => {
        this.closeForm();
        this.isLoadingResult = false;
      },
      error: (error) => {
        this.errorMessage = error.error.validationErrors[0].userMessage ?? error.error.detail;
        this.isLoadingResult = false;
      },
    });
  }

  private edit(): void {
    this.isLoadingResult = true;
    this._productService.edit(this.formControl.value).subscribe({
      next: (empty) => {
        this.closeForm();
        this.isLoadingResult = false;
      },
      error: (error) => {
        this.errorMessage = error.error.validationErrors[0].userMessage ?? error.error.detail;
        this.isLoadingResult = false;
      },
    });
  }

  public isDisabled() {
    return this.formControl.status === 'INVALID';
  }

  public closeForm(){
    this._router.navigate(['/management/products']);
  }

  public deleteImage(id: number, imageKey: string): void{
    this.isLoadingResult = true;
    this._productService.deleteImage(id, imageKey)
                        .subscribe({
                          next: (empty) => {
                            this.product.images = this.product.images.filter(image => image.key !== imageKey);
                            this.isLoadingResult = false;
                          },
                          error: (error) => {
                            this.errorMessage = error.error.detail;
                            this.isLoadingResult = false;
                          },
                        });;
  }

  public openProductImageCreateForm():void{
    if(!this.product.id){
      this.createProductAndOpenProductImageForm();
      return;
    }
    this.openProductImageFormModal();
  }

  private createProductAndOpenProductImageForm():void{
    this.isLoadingResult = true;
    this._productService.create(this.formControl.value).subscribe({
      next: (response) => {
        this.product.id = this.getIdFromLocation(response);
        this.formControl.value.id = this.product.id;
        this.openProductImageFormModal();
        this.isLoadingResult = false;
      },
      error: (error) => {
        this.errorMessage = error.error.validationErrors[0].userMessage ?? error.error.detail;
        this.isLoadingResult = false;
      },
    });
  }

  private getIdFromLocation(response: HttpResponse<Product>): number{
    let location = response.headers.get('location');
    if(location){
      let locationSplited = location.split("/");
      return Number(locationSplited[locationSplited.length - 1]);
    }
    throw Error("It was not found a location in the header response");
  }

  private openProductImageFormModal(): void{
    const dialogRef: MatDialogRef<ProductImageFormComponent> =
    this.dialog.open(ProductImageFormComponent, {
      data: {
        productId: this.product.id,
        imageOrder: this.product.images.length + 1 ?? 2
      },
    });
    dialogRef.afterClosed().subscribe((productImage) => {
      if (productImage) {
        this.product.images.push(productImage);
        this.sortProductImages();
      }
    });
  }

  public openProductImageEditForm(imageKey: string, imageOrder: number):void{
    const dialogRef: MatDialogRef<ProductImageFormComponent> =
    this.dialog.open(ProductImageFormComponent, {
      data: {
        productId: this.product.id,
        imageKey: imageKey,
        imageOrder: imageOrder
      },
    });
    dialogRef.afterClosed().subscribe((newImageOrder) => {
      if(newImageOrder){
        this.product.images.find(i=> i.key == imageKey)!.imageOrder= newImageOrder;
        this.sortProductImages();
      }
    });
  }

  private sortProductImages():void{
    this.product.images = this.product.images.sort((a, b) => a.imageOrder - b.imageOrder);
  }

}

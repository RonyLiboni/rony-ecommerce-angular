import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../shared/MyErrorStateMatcher';
import { ProductService } from 'src/app/domain/services/product/product.service';
import { Category } from 'src/app/domain/models/department-hierarchy/Category';
import { Product } from 'src/app/domain/models/product/Product';
import { CategoryService } from 'src/app/domain/services/department-hierarchy/category.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private readonly _productService: ProductService,
              private readonly _categoryService: CategoryService,
              private readonly _activatedRoute: ActivatedRoute,
              private readonly _router: Router,
              private readonly _formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this._categoryService.getAll()
                    .subscribe(c => this.categories = c);
    this.formControl = this.buildForm();
    this.setFormValuesIfIdWasSent();
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
      category: {
                    id: [null, [Validators.required]]
                }
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
                              this.errorMessage = error.error.detail;
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
      category: {
                  id: product.category.id
                },
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
    this._productService.create(this.formControl.value).subscribe({
      next: (empty) => {
        this.closeForm();
      },
      error: (error) => {
        this.errorMessage = error.error.detail;
      },
    });
  }

  private edit(): void {
    this._productService.edit(this.formControl.value).subscribe({
      next: (empty) => {
        this.closeForm();
      },
      error: (error) => {
        this.errorMessage = error.error.detail;
      },
    });
  }

  public isDisabled() {
    return this.formControl.status === 'INVALID';
  }

  public closeForm(){
    this._router.navigate(['/management/products']);
  }

  public tes(){
    return 'ste'
  }
}

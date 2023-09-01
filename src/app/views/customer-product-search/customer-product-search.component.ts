import { HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { merge, debounceTime, startWith, switchMap } from 'rxjs';
import { Product } from 'src/app/domain/models/product/Product';
import { CustomerSearchFilters, CustomerSearchService } from 'src/app/domain/services/customer-search/customer-search.service';

@Component({
  selector: 'app-customer-product-search',
  templateUrl: './customer-product-search.component.html',
  styleUrls: ['./customer-product-search.component.css']
})
export class CustomerProductSearchComponent implements AfterViewInit, OnInit{
  products!: Product[];
  resultsLength = 0;
  isLoadingResults = false;
  queryControl!: FormGroup;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  sortFields: string[] = ["name", "price"];
  errorMessage: string = '';
  shouldShowFilter: boolean = true;
  filtersAvailable: CustomerSearchFilters = { departments: [], subDepartments: [], categories: []};
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly _customerSearchService: CustomerSearchService,
              private readonly _formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.queryControl = this.buildForm();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: Event): void {
    this.shouldShowFilter = window.innerWidth > 800;
  }

  private buildForm(): FormGroup {
    return this._formBuilder.group({
      name: null,
      startPrice: null,
      endPrice: null,
      sortDirection: "asc",
      sortField: "id",
      categoriesDTO: null,
      subDepartmentsDTO: null,
      departmentsDTO: null
    });
  }

  public ngAfterViewInit(): void {
    this.resetPageNumber();
    merge(this.paginator.page, this.queryControl.valueChanges)
      .pipe(
            debounceTime(350),
            startWith({}),
            switchMap(() => {
              this.isLoadingResults = true;
              return this._customerSearchService.getProductsFilteredBy(this.buildQueryHttpParams());
        }))
      .subscribe((products) => {
        this.isLoadingResults = false;
        this.resultsLength = products.totalCount;
        this.products = products.body;
        this._customerSearchService.getProductSearchFilters(this.buildFilterQueryHttpParams())
            .subscribe(customerSearchFilter => this.filtersAvailable = customerSearchFilter );
        if(this.products.length == 0){
          this.errorMessage = "There are no products that match your search!";
        } else {
          this.errorMessage ='';
        }
      });
  }

  private resetPageNumber(): void{
    this.queryControl.valueChanges.subscribe(() => (this.paginator.pageIndex = 0));
  }

  private buildQueryHttpParams(): HttpParams{
    let params = new HttpParams();
    params = params.append("pageNumber", this.paginator.pageIndex + 1);
    params = params.append("pageSize", this.paginator.pageSize.toString());
    params = params.append("sortField", this.queryControl.value.sortField);
    params = params.append("sortDirection", this.queryControl.value.sortDirection);
    if(this.queryControl.value.name) params = params.append("productName", this.queryControl.value.name);
    if(this.queryControl.value.startPrice) params = params.append("startPrice", this.queryControl.value.startPrice);
    if(this.queryControl.value.endPrice) params = params.append("endPrice", this.queryControl.value.endPrice);
    if(this.queryControl.value.departmentsDTO) params = params.append("departmentsDTO", this.queryControl.value.departmentsDTO);
    if(this.queryControl.value.subDepartmentsDTO) params = params.append("subDepartmentsDTO", this.queryControl.value.subDepartmentsDTO);
    if(this.queryControl.value.categoriesDTO) params = params.append("categoriesDTO", this.queryControl.value.categoriesDTO);
    return params;
  }

  private buildFilterQueryHttpParams(): HttpParams{
    let params = new HttpParams();
    if(this.queryControl.value.name) params = params.append("productName", this.queryControl.value.name);
    if(this.queryControl.value.startPrice) params = params.append("startPrice", this.queryControl.value.startPrice);
    if(this.queryControl.value.endPrice) params = params.append("endPrice", this.queryControl.value.endPrice);
    return params;
  }

  public addToCart(): void{
    alert('Not implemented yet');
  }

  public addInDepartmentHierarchyFilter(event: any, name: string, formControlName: string): void{
    const control = this.queryControl.get(formControlName) as FormControl;
    if (event.target.checked) {
      control.setValue([...control.value ?? [], name]);
    } else {
      control.setValue(control.value.filter((value: string) => value !== name) ?? []);
    }
  }

}

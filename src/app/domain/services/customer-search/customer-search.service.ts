import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared-types/Page';
import { Product } from '../../models/product/Product';

export interface CustomerSearchFilters{
  departments: string[];
  subDepartments: string[];
  categories: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CustomerSearchService {

  private readonly API = 'http://localhost:8080/api/customer-search';

  constructor(private readonly _http: HttpClient) {  }

  public getProductsFilteredBy(params: HttpParams): Observable<Page<Product>> {
    return this._http.get<Page<Product>>(this.API, { params });
  }

  public getProductSearchFilters(params: HttpParams): Observable<CustomerSearchFilters> {
    return this._http.get<CustomerSearchFilters>(`${this.API}/filter`, { params });
  }

}

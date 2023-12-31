import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateAndEditAbstractService } from '../create-and-edit-abstract.service';
import { Product, ProductImage } from '../../models/product/Product';
import { Page } from 'src/app/shared-types/Page';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends CreateAndEditAbstractService<Product> {

  private readonly API = 'http://localhost:8080/api/products';

  constructor(http: HttpClient) {
    super(http);
  }

  public getBySku(params: HttpParams): Observable<Page<Product>> {
    return this._http.get<Page<Product>>(`${this.API}`, { params });
  }

  protected override getEditUrl(product: Product): string {
    return `${this.API}/${product.id}`;
  }

  protected override getUrl(): string {
    return this.API;
  }

  public getById(id: number) : Observable<Product> {
    return this._http.get<Product>(`${this.API}/${id}`);
  }

  public deleteImage(id: number, imageKey: string): Observable<void> {
    return this._http.delete<void>(`${this.API}/${id}/images/${imageKey}`);
  }

  public editImage(id: number, imageKey: string, imageOrder:number): Observable<void> {
    return this._http.put<void>(`${this.API}/${id}/images/${imageKey}`, imageOrder);
  }

  public addImage(id: number, imageOrder:number, image: File): Observable<ProductImage> {
    let formData = new FormData();
    formData.append('imageOrder', String(imageOrder));
    formData.append('image', image);
    return this._http.post<ProductImage>(`${this.API}/${id}/images`, formData);
  }

}

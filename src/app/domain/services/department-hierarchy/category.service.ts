import { Injectable } from '@angular/core';
import { CreateAndEditAbstractService } from '../create-and-edit-abstract.service';
import { Category } from '../../models/department-hierarchy/Category';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends CreateAndEditAbstractService<Category>{
  private readonly API = 'http://localhost:8080/api/categories';

  constructor(http: HttpClient) {
    super(http);
  }

  protected override getUrl(): string {
    return this.API;
  }

  protected override getEditUrl(category: Category): string {
    return `${this.getUrl()}/${category.id}`;
  }
}

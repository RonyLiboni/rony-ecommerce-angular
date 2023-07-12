import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateAndEditAbstractService } from '../create-and-edit-abstract.service';
import { Observable } from 'rxjs';
import { Department } from '../../models/department-hierarchy/Department';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService extends CreateAndEditAbstractService<Department> {
  private readonly API = 'http://localhost:8080/api/departments';

  constructor(http: HttpClient) {
    super(http);
  }

  public getBy(name: string): Observable<Department> {
    return this.http.get<Department>(`${this.API}/${name}`);
  }

  public getAll(): Observable<Department[]> {
    return this.http.get<Department[]>(this.API);
  }

  protected override getEditUrl(department: Department): string {
    return `${this.API}/${department.id}`;
  }

  protected override getUrl(): string {
    return this.API;
  }
}

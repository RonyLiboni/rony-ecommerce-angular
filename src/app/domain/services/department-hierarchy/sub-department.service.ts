import { Injectable } from '@angular/core';
import { CreateAndEditAbstractService } from '../create-and-edit-abstract.service';
import { SubDepartment } from '../../models/department-hierarchy/SubDepartment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../../models/department-hierarchy/Department';

@Injectable({
  providedIn: 'root'
})
export class SubDepartmentService extends CreateAndEditAbstractService<SubDepartment>{
  private readonly API = 'http://localhost:8080/api/sub-departments';

  constructor(http: HttpClient) {
    super(http);
  }

  protected override getUrl(): string {
    return this.API;
  }

  protected override getEditUrl(subDepartment: SubDepartment): string {
    return `${this.getUrl()}/${subDepartment.id}`;
  }
}

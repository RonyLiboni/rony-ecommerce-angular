import { SubDepartment } from './SubDepartment';

export class Department {
  id: number = 0;
  name: string = '';
  subDepartments: SubDepartment[] = [new SubDepartment()];
}

import { Category } from './Category';

export class SubDepartment {
  id: number = 0;
  name: string = '';
  categories: Category[] = [new Category()];
}

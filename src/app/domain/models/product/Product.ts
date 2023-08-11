export class Product{
  id!: number;
  sku!: string;
  name!: string;
  price!: number;
  category!: {
    id: number;
    name: string;
  }
  description!: string;
}

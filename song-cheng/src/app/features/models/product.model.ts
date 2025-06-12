export interface Product {
  id: number;
  name: string;
  code: string;
  description?: string;
  price: number;
  categoryId: number;
  ingredients: string[];
}

export interface Ingredient {
  id: number;
  name: string;
  description?: string;
  price: number;
}

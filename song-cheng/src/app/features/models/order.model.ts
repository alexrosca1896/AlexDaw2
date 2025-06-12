export interface Order {
  id: number;
  date: string;
  price: number;
  type: string;
  clientId: number;
  details: OrderDetail[];

  expanded?: boolean;
}

export interface OrderDetail {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

import { Address } from './address.model';

export interface Client {
  id: number;
  dni: string;
  password: string;
  name: string;
  phone: string;
  addresses: Address[];
}

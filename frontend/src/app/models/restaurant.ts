import { Dish } from './dish';
import { Address } from './interfaces/address';
import { Table } from './interfaces/table';


export class Restaurant {
  _id: string = '';
  name: string = '';
  address: Address = {street: '', number:'', city: ''}
  phone_number: string = '';
  email: string = '';
  type: string = '';
  open: string = '';
  close: string = '';
  rating: number = 0;
  description: string = '';
  plan: string = '';
  tables: Table[] = [];
  menu: Dish[] = [];
}

import { Dish } from './dish';
import { Address } from './interfaces/address';
import { Table } from './interfaces/table';


export class Restaurant {
  _id: string = '';
  name: string = '';
  address: Address = {street: '', street_number: 0, city: ''}
  phone_number: string = '';
  email: string = '';
  type: string = '';
  location: string = '';
  open: string = '';
  close: string = '';
  rating: number = 0;
  description: string = '';
  floor_plan: string = '';
  tables: Table[] = [];
  menu: Dish[] = [];
}

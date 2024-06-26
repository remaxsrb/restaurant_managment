import { Dish } from './dish';
import { Table } from './table';

export class Restaurant {
  _id: string = '';
  name: string = '';
  address: string = '';
  phone_number: string = '';
  email: string = '';
  type: string = '';
  location: string = '';
  open: string = '';
  close: string = '';
  description: string = '';
  floor_plan: string = '';
  tables: Table[] = [];
  menu: Dish[] = [];
}


import { Time } from "../types/time";
import { Address } from "./address";
import { Table } from "./table";

export interface NewRestaurant {
  name: string;
  address: Address;
  phone_number: string;
  email: string;
  type: string;
  location: string;
  open: Time;
  close: Time;
  description: string;
  floor_plan: string;
  rating: Number;
  tables: Table[]
  menu: []
}

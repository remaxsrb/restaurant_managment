import { Guest } from "./guest";
import { Restaurant } from "./restaurant";

export class Reservation {
  _id: string = '';
  restaurant: Restaurant = new Restaurant();
  guest: Guest = new Guest();
  table: Number = -1;
  datetime: Date = new Date();
  showed_up: Boolean = false;
}
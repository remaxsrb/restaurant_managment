import { Time } from "../types/time";

export interface NewRestaurant {
  name: string;
  address: string;
  phone_number: string;
  email: string;
  type: string;
  location: string;
  open: Time;
  close: Time;
  description: string;
  floor_plan: string;
  rating: Number;
}

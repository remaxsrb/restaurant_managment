import { Dish } from "./dish"

export class Restaurant {
    _id: string = ''
    name: string = ''
    type: string = ''
    address: string = ''
    phone_number: string = ''
    location: string = ''
    description: string = ''
    floor_plan: string = ''
    dishes: Dish[] = []
}
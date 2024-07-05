import { Address } from "./interfaces/address"

export class User {
    _id: string = ''
    username: string = ''
    email: string = ''
    role: string = ''
    security_question: string = ''
    security_question_answer: string = ''
    firstname: string = ''
    lastname: string = ''
    gender: string = ''
    address: Address = {street: '', street_number: 0, city: ''}
    phone_number: string = ''
    credit_card_number: string = ''
    profile_photo: string = ''
    status: string = ''
    late_for_reservation: string = ''
    restaurant: string = ''
}
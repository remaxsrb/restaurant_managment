import { Address } from "./address"

export interface NewGuset {
    username: string 
    password: string
    email: string 
    role: string 
    security_question: string
    security_question_answer: string
    firstname: string
    lastname: string
    gender: string
    address: Address 
    phone_number: string
    credit_card_number: string
    profile_photo: string
    status: string 
    late_for_reservation: string
}
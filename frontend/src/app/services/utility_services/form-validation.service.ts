import { Injectable } from '@angular/core';
import { RegexPatterns } from '../../components/regex_patterns';
@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  validate_user_form(new_user: any, selectedFile: File | null): boolean {
    const isValidPassword = RegexPatterns.PASSWORD.test(new_user.password);
    const isValidEmail = RegexPatterns.EMAIL.test(new_user.email);
    const isValidPhoneNumber = RegexPatterns.PHONE_NUMBER.test(
      new_user.phone_number
    );
    var isValidCreditCardNumber = true;
    if (new_user.credit_card_number)
      isValidCreditCardNumber = RegexPatterns.CREDIT_CARD_NUMBER.test(
        new_user.credit_card_number
      );

    const isPngOrJpg = selectedFile
      ? RegexPatterns.FILE_FORMAT.test(selectedFile.name)
      : true;
      const isValidAddress = RegexPatterns.ADDRESS.test(new_user.address.street);


    return (
      isValidPassword &&
      isValidAddress &&
      isValidEmail &&
      isValidPhoneNumber &&
      isValidCreditCardNumber &&
      isPngOrJpg
    );
  }
  validate_change_password_form(new_password: string) {
    return RegexPatterns.PASSWORD.test(new_password);
  }

  validate_email(email:string) {
    return RegexPatterns.EMAIL.test(email);

  }

  validate_phone_number(phone_number:string) {
    return RegexPatterns.EMAIL.test(phone_number);

  }

  validate_credit_card_number(credit_card_number:string) {
    return RegexPatterns.EMAIL.test(credit_card_number);

  }

  validate_image_format(selectedFile: File | null) {
    return selectedFile
    ? RegexPatterns.FILE_FORMAT.test(selectedFile.name)
    : true;

  }

}

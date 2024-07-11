import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/model_services/user.service';
import { FormValidationService } from 'src/app/services/utility_services/form-validation.service';
import { RegexPatterns } from '../regex_patterns';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css'],
})
export class AskQuestionComponent {
  constructor(
    private user_service: UserService,
    private validation_service: FormValidationService,
    private router: Router
  ) {}

  show_password_form = false;

  component_data = {
    username: '',
    security_question: '',
    security_question_answer: '',
  };

  password = '';

  ask_form_flags = {
    username_not_found: false,
    security_question_mismatch: false,
    wrong_answer: false,
    invalid_password_format: false,
    general_errors: false,
  };

  onAnswerSubmit() {
    this.reset_ask_flags(); //Incase someone does not reload after bad submission, reset flags as to not confuse the user

    localStorage.setItem('username', this.component_data.username);

    this.user_service.check_question(this.component_data).subscribe({
      next: (data) => {
        this.show_password_form = true;
      },
      error: (error) => {

        // Handle specific errors or show a general message
        if (error.status === 404) {
          this.ask_form_flags.username_not_found = true;
          // Not found error
        } else if (error.status === 400) {
          this.ask_form_flags.security_question_mismatch = true;
          // Mismatch quesiton error
        } else if (error.status === 401) {
          this.ask_form_flags.username_not_found = true;
          // Wrong answer error
        } else {
          this.ask_form_flags.general_errors = true; // General error
        }
      },
    });
  }

  private validate_password() {
    const is_valid = this.validation_service.validate_change_password_form(
      this.password
    );

    if (!is_valid) this.set_form_flag();

    return is_valid;
  }

  private set_form_flag() {

    const is_valid_password = RegexPatterns.PASSWORD.test(this.password);

    if (!is_valid_password) this.ask_form_flags.invalid_password_format = true;
  }

  private process_new_password_submission() {

    let data = {
      username: localStorage.getItem('username'),
      password: this.password,
    };

    localStorage.removeItem('username');

    this.user_service.change_password(data).subscribe({
      next: (data) => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        // Handle specific errors or show a general message

        this.ask_form_flags.general_errors = true; // General error
      },
    });
  }

  private reset_ask_flags() {
    this.ask_form_flags.username_not_found = false;
    this.ask_form_flags.security_question_mismatch = false;
    this.ask_form_flags.wrong_answer = false;
  }

  onPasswordSubmit() {
    this.ask_form_flags.invalid_password_format = false; 

    if (!this.validate_password()) return; // Validation failed, stop submission

    this.process_new_password_submission();
  }
}

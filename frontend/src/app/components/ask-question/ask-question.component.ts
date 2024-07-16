import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/model_services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RegexPatterns } from '../regex_patterns';
import { securityQuestions } from 'src/app/securityQuestions';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css'],
})
export class AskQuestionComponent implements OnInit {
  constructor(
    private user_service: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  show_password_form = false;
  askQuestionForm!: FormGroup;
  newPasswordForm!: FormGroup;

  securityQuestions = securityQuestions;

  ask_form_flags = {
    username_not_found: false,
    security_question_mismatch: false,
    wrong_answer: false,
    invalid_password_format: false,
    general_errors: false,
  };

  ngOnInit() {
    this.initAskQuestionForm();
    this.initNewPasswordForm();
  }

  initAskQuestionForm(): void {
    this.askQuestionForm = this.fb.group({
      username: ['', Validators.required],
      security_question: ['', Validators.required],
      security_question_answer: ['', Validators.required],
    });
  }

  initNewPasswordForm(): void {
    this.newPasswordForm = this.fb.group({
      password: [
        '',
        [Validators.required, Validators.pattern(RegexPatterns.PASSWORD)],
      ],
    });
  }


  get username() {
    return this.askQuestionForm.get('username');
  }

  get security_question() {
    return this.askQuestionForm.get('security_question');
  }

  get security_question_answer() {
    return this.askQuestionForm.get('security_question_answer');
  }

  get new_password() {
    return this.newPasswordForm.get('password');
  }

  onAnswerSubmit() {
    localStorage.setItem('username', this.username!.value);

    this.user_service.check_question(this.askQuestionForm.value).subscribe({
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
          // Mismatch question error
        } else if (error.status === 401) {
          this.ask_form_flags.wrong_answer = true;
          // Wrong answer error
        } else {
          this.ask_form_flags.general_errors = true; // General error
        }
      },
    });
  }

  private reset_ask_flags() {
    this.ask_form_flags.username_not_found = false;
    this.ask_form_flags.security_question_mismatch = false;
    this.ask_form_flags.wrong_answer = false;
  }

  onPasswordSubmit() {
    let data = {
      username: localStorage.getItem('username'),
      password: this.new_password!.value,
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
}

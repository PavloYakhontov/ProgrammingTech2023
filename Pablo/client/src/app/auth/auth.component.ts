import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit
{
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup;
  validationErrors: string[] = [];

  constructor (
    private accountService: AccountService,
    private router: Router,
    private fb: FormBuilder
  )
  {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(8)],
      ],
      confirmPassword: [
        '',
        [Validators.required, this.matchValues('password')],
      ],
    });
    this.registerForm.controls['password'].valueChanges.subscribe(() =>
    {
      this.registerForm?.controls['confirmPassword'].updateValueAndValidity();
    });
  }

  ngOnInit(): void
  {


  }

  login()
  {
    this.accountService.login(this.model).subscribe(
      {
        next: _ =>
        {
          this.router.navigateByUrl('/');
          this.model = {};
        }
      }
    );
  }

  matchValues(matchTo: string): ValidatorFn
  {
    return (control: AbstractControl) =>
    {
      return control?.value == (control?.parent?.controls as { [key: string]: AbstractControl })[matchTo].value
        ? null
        : { isMatching: true };
    };
  }


  register()
  {
    this.accountService.register(this.registerForm?.value).subscribe(
      (response) =>
      {
        this.router.navigateByUrl("/members");
      },
      (error) =>
      {
        this.validationErrors = error;
      }
    );
  }
}

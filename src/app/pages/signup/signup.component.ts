import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AuthUser } from '@core/inrefaces';
import { AuthService } from '@shared/services';

type UserControls = { [key in keyof AuthUser]: AbstractControl };
type UserFormGroup = FormGroup & { value: AuthUser; controls: UserControls };

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  userForm: FormGroup;

  constructor(private authService: AuthService) {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    } as UserControls) as UserFormGroup;
  }

  public onSubmit(): void {
    if (!this.userForm.valid) {
      return;
    }

    this.authService.signUp(this.userForm.value);
  }
}

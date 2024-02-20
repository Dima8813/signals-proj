import { Component } from '@angular/core';
import { AuthUser } from '@core/inrefaces';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '@shared/services';

type UserControls = { [key in keyof AuthUser]: AbstractControl };
type UserFormGroup = FormGroup & { value: AuthUser; controls: UserControls };

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
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

    this.authService.login(this.userForm.value);
  }
}

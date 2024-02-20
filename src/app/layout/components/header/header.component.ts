import { Component } from '@angular/core';

import { AuthService } from '@shared/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  public isAuthSig = this.authService.isAuthSig;

  constructor(private authService: AuthService) {}

  public logoutHandler(): void {
    this.authService.logout();
  }
}

import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-message',
  templateUrl: './login-message.component.html',
  styles: [
    `
    :host {
      display: flex;
    }

    .example-pizza-party {
      color: hotpink;
    }
  `,
  ],
})
export class LoginMessageComponent {
  snackBarRef = inject(MatSnackBarRef);
}

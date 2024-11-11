import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-password',
  templateUrl: './dialog-password.component.html',
  styleUrls: ['./dialog-password.component.scss']
})
export class DialogPasswordComponent {
  constructor(public dialogRef: MatDialogRef<DialogPasswordComponent>) {}

  isPasswordVisible = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}

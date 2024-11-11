import { Router } from '@angular/router';
import { Component, Inject, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface dialogError{
  title: string,
  message: string,
  redirect: boolean
}

@Component({
  selector: 'app-err-api',
  templateUrl: './err-api.component.html',
  styleUrls: ['./err-api.component.scss']
})
export class ErrApiComponent {
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: dialogError,
  ) {}

}

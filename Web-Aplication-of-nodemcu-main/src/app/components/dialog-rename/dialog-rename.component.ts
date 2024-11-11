import { MaquinasComponent } from './../../pages/maquinas/maquinas.component';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  animal: string;
}


@Component({
  selector: 'app-dialog-rename',
  templateUrl: './dialog-rename.component.html',
  styleUrls: ['./dialog-rename.component.scss']
})


export class DialogRenameComponent {
  constructor(
    public dialogRef: MatDialogRef<MaquinasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

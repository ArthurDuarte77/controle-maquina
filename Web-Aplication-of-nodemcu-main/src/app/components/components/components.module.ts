import { SnackbarComponent } from './../snackbar/snackbar.component';
import { ErrApiComponent } from './../err-api/err-api.component';
import { ProgressSpinerComponent } from './../progress-spiner/progress-spiner.component';
import { FooterComponent } from './../footer/footer.component';
import { RouterModule } from '@angular/router';
import { SideNavComponent } from './../side-nav/side-nav.component';
import { DarkModeComponent } from './../dark-mode/dark-mode.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { DialogRenameComponent } from '../dialog-rename/dialog-rename.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DialogPasswordComponent } from '../dialog-password/dialog-password.component';

@NgModule({
  declarations: [
    DarkModeComponent,
    SideNavComponent,
    FooterComponent,
    ProgressSpinerComponent,
    ErrApiComponent,
    DialogRenameComponent,
    SnackbarComponent,
    DialogPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatIconModule,
    RouterModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  exports: [
    DarkModeComponent,
    SideNavComponent,
    FooterComponent,
    ProgressSpinerComponent,
    ErrApiComponent,
  ]
})
export class ComponentsModule { }

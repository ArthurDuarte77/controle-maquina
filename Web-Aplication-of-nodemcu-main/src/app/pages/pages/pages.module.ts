import { SecondsDataPipe } from './../../pipes/seconds-data.pipe';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components/components.module';
import { MaquinasComponent } from './../maquinas/maquinas.component';
import { LoginComponent } from './../login/login.component';
import { HomeComponent } from './../home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipePipe } from 'src/app/pipes/date-pipe.pipe';
import { LastItemPipe } from 'src/app/pipes/last-item.pipe';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { MaterialExampleModule } from 'src/material.module';


export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    MaquinasComponent,
    DatePipePipe,
    LastItemPipe,
    SecondsDataPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ComponentsModule,
    RouterModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MaterialExampleModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
})
export class PagesModule { }

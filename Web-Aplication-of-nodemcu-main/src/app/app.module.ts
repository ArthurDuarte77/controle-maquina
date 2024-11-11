import { ThdadosEffectService } from './store/thdados.effect.service';
import { ComponentsModule } from 'src/app/components/components/components.module';
import { PagesModule } from './pages/pages/pages.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginMessageComponent } from './components/login-message/login-message.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ErrorServiceComponent } from './pages/error-service/error-service.component';
import { UserComponent } from './pages/user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginMessageComponent,
    ErrorServiceComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    PagesModule,
    ComponentsModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([ThdadosEffectService])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { MaquinasComponent } from './pages/maquinas/maquinas.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "machine", component: MaquinasComponent},
  {path: "machine/home/:name", component: HomeComponent},
  {path: "user", component: UserComponent},
  {path: "**", redirectTo: "machine"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

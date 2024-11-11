import { LoginMessageComponent } from './../../components/login-message/login-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.state';
import { ErrApiComponent } from 'src/app/components/err-api/err-api.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { Users } from 'src/app/interfaces/users';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  color1: string = 'black';
  color2: string = 'black';
  margin1: number = 2;
  margin2: number = 2;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private store: Store<{app: IAppState}>
  ) {}

  durationInSeconds = 5;

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(res => {
      if(res == true){
        this.router.navigate(['/machine']);
      }
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(ErrApiComponent, {data: {title: "Error", message: "Ocurred a error in service", redirect: true},
  });
  }

  results: any[] = [];
  stateLogin: boolean = false;
  hide = true;
  message: string = ""

  loginForm = this.fb.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required],
  });

  openSnackBar(){
    this._snackBar.openFromComponent(LoginMessageComponent, {
      duration: 5000,
    });
  }
  login() {
    this.authService.login(this.loginForm.value.email!, this.loginForm.value.password!).subscribe(res => {
      if(res != false){
        this.authService.getById().subscribe((result: Users) => {
          this.router.navigate(['/machine']);
          this._snackBar.open(`User: ${result.username} logged in successfully.`, "Close", {
            duration: 5000,
          });
        })
      }else{
        this._snackBar.open(`Unable to log in. Please check your credentials and try again.`, "Close", {
          duration: 5000,
        });
      }
    })
  }
}

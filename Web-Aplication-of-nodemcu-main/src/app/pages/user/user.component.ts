import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogPasswordComponent } from 'src/app/components/dialog-password/dialog-password.component';
import { Users } from 'src/app/interfaces/users';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  password: string = ""
  constructor(private authService: AuthService, public dialog: MatDialog) { }

  user: Users = {
    username: '',
    email: '',
    password: ''
  }

  ngOnInit(): void {
    this.authService.getById().subscribe(res => {
      this.user = res;
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogPasswordComponent);

    dialogRef.afterClosed().subscribe(result => {
      var newPassword = ""
      this.authService.getById().subscribe(res => {
        newPassword = res.password
        this.authService.veryfyPassword(result, newPassword).subscribe(res => {
          if(res == true){
            this.password = result;
          }
        })
      })
    });
  }

}

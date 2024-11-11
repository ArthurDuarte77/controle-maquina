
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ErrApiComponent } from '../err-api/err-api.component';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  showFiller = false;

  constructor(
    private route: Router,
    public dialog: MatDialog,
    private routeActivate: ActivatedRoute
  ) {}

  newPath = ''
  activeMachine: boolean = false;
  activeDashboard: boolean = false;
  activeUser: boolean = false;

  ngOnInit(): void {
      this.routeActivate.snapshot.url.map((res) => {
        this.newPath = res.path
      })
      if(this.newPath == 'machine'){
        this.activeMachine = true;
      }else{
        this.activeDashboard = true;
      }
  }

  clearLocalStorage() {
    localStorage.clear();
    this.route.navigate(['/login']);
  }

  openDialog( ): void {
    const dialogRef = this.dialog.open(ErrApiComponent, {data: {title: "Update", message: "update coming soon",redirect: false},
    });
  }
}

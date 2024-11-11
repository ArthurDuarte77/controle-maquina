import { Location } from '@angular/common';
import { DialogRenameComponent } from './../../components/dialog-rename/dialog-rename.component';
import { MatDialog } from '@angular/material/dialog';
import { ErrApiComponent } from './../../components/err-api/err-api.component';
import { Router } from '@angular/router';
import { Nodemcu } from './../../interfaces/nodemcu';
import { Component, OnInit } from '@angular/core';
import { NodemcuApiService } from 'src/app/services/nodemcu-api.service';
import { AuthService } from 'src/app/services/auth.service';

export interface MachineNew {
  nome: string;
  state: string;
}


@Component({
  selector: 'app-maquinas',
  templateUrl: './maquinas.component.html',
  styleUrls: ['./maquinas.component.scss'],
})
export class MaquinasComponent implements OnInit {
  constructor(
    private location: Location,
    public dialog: MatDialog,
    private service: NodemcuApiService,
    private router: Router,
    private authService: AuthService
  ) {}
  countMap: number = 0;
  results: Nodemcu[] = [];
  resultid: any[] = [];
  groupedData: any[] = [];
  idUser: number = -1;
  hide: boolean = true;
  displayed: boolean = false;
  groupedNameAndState: any[] = [];
  renameNameMachine: string = '';
  veryfy: number = 0;

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(res => {
      if(res != true){
        this.authService.logout()
        this.router.navigate(['/login']);
      }else{
        this.service.getThdados().subscribe(
          (res) => {
            this.results = res;
            this.mostrarMaquinas()
          },
          (err) => {
            this.openDialog();
          }
        );
      }
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(ErrApiComponent, {
      data: {
        title: 'Error',
        message: 'Ocurred a error in service',
        redirect: true,
      },
    });
  }

  mostrarMaquinas() {
    const result = this.results.reduce((acc: { [key: string]: MachineNew }, item: any) => {
      if (!acc[item.nome]) {
        acc[item.nome] = { nome: item.nome, state: item.state };
      } else {
        acc[item.nome].state = item.state;
      }
      return acc;
    }, {});
    this.groupedData = Object.values(result)
    this.hide = false;
  }
}

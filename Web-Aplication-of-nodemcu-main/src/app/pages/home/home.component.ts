import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Nodemcu } from './../../interfaces/nodemcu';
import { NodemcuApiService } from './../../services/nodemcu-api.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ErrApiComponent } from 'src/app/components/err-api/err-api.component';
import { Conditional } from '@angular/compiler';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy{
  displayedColumns: string[] = [];
  dataSource: Nodemcu[] = [];
  results: Nodemcu[] = [];
  counter: number[] = [];
  state: string[] = [];
  data: any[] = [];
  machineName: any;
  hide: boolean = false;
  dates: Date[] = [];
  numberOfCycles: number = 0;
  timeOfProduction: any = 0;
  minDate = 0;
  maxDate = 0;
  chartProduction: Chart<'bar', number[], any> | undefined;
  chartState: Chart<'bar', number[], any> | undefined;
  onTime: number = 0;
  offTime: number = 0;
  interval: NodeJS.Timer | undefined;

  constructor(
    private service: NodemcuApiService,
    private actRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  @ViewChild('ControleProducao', { static: true })
  graphProduction!: ElementRef;

  @ViewChild('ControleEstado', { static: true })
  graphState!: ElementRef;

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(res => {
      if(res != true){
        this.router.navigate(['/login']);
      }
    })
    this.init();
    this.interval = setInterval(() => {
      this.init();
    }, 5000);
  }

  ngOnDestroy(): void {
      clearInterval(this.interval);
  }

  init() {
    this.actRoute.params.subscribe((param) => {
      this.machineName = param;
    });
    this.service.getThdadosMachina(this.machineName.name).subscribe(
      (res) => {
        this.results = res;
        this.data = []
        this.state = []
        this.counter = []
        res.forEach((nodemcu) => {
          this.data.push(new Date(nodemcu.data).toLocaleString());
          this.state.push(nodemcu.state)
          this.counter.push(nodemcu.counter)
        })
        this.getNumberCycles(res);
        this.getTimeProduction(res);
        this.getDiffDate(res);
        this.dataSource = this.results;
        if(this.chartProduction && this.chartState){
          this.chartProduction!.data.datasets[0].data = this.counter
          this.chartProduction!.data.labels = this.data
          this.chartProduction.update()
          this.chartState!.data.datasets[0].data = this.state as any;
          this.chartState!.data.labels = this.data
          this.chartState.update()
        }else{
        this.chargeGraphs();
        }
      },
      (err) => {
        const dialogRef = this.dialog.open(ErrApiComponent, {
          data: {
            title: 'Error',
            message: 'Ocurred a error in service',
            redirect: true,
          },
        });
      }
    );
  }

  chargeGraphs() {
    this.displayedColumns = ['demo-state','demo-counter', 'demo-data'];

    this.chartProduction = new Chart(this.graphProduction.nativeElement, {
      type: 'bar',
      data: {
        labels: this.data,
        datasets: [
          {
            label: 'Produção',
            data: this.counter,
            backgroundColor: 'rgb(102, 205, 170)',
            borderColor: 'rgb(127,0,255)',
          },
        ],
      },
    });
    this.chartState = new Chart(this.graphState.nativeElement, {
      type: 'line',
      options: {
        scales: {
          y: {
            // beginAtZero: true,
            type: 'category',
            labels: ['ON', 'OFF'],
            offset: true,
          },
        },
      },
      data: {
        labels: this.data,
        datasets: [
          {
            label: 'Power',
            data: this.state,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 01)',
            borderWidth: 1,
            stepped: true,
          },
        ],
      },
    });
    this.hide = false;
  }

  getNumberCycles(results: Nodemcu[]) {
    var lengthResults = results.length;
    var numberOfCycles: Nodemcu[] = [];
    numberOfCycles.push(results[lengthResults - 1]);
    numberOfCycles.map((res) => (this.numberOfCycles = res.counter));
  }

  getDiffDate(res: Nodemcu[]) {
    this.onTime = 0;
    this.offTime = 0;
    for (let i = 0; i < res.length; i++) {
      const log = res[i];
      if (log.state === 'ON') {
        if (i > 0 && res[i - 1].state === 'ON') {
          this.onTime +=
            (new Date(log.data).getTime() -
              new Date(res[i - 1].data).getTime()) /
            1000;
        } else if (i == 0 && res[i + 1].state === 'OFF') {
          console.log("entrou")
          this.offTime +=
          (new Date(res[i + 1].data).getTime() -
          new Date(log.data).getTime()) /
          1000;
          console.log(this.offTime)
        }
      }
      else {
        if (i > 0 && res[i - 1].state === 'OFF') {
          console.log("entrou")
          this.offTime +=
            (new Date(log.data).getTime() -
              new Date(res[i - 1].data).getTime()) /
            1000;
            console.log(this.offTime)
        } else if (i == 0 && res[i + 1].state === 'ON') {
          this.offTime +=
            (new Date(res[i + 1].data).getTime() -
              new Date(log.data).getTime()) /
            1000;
        }
      }
    }
  }

  getTimeProduction(results: Nodemcu[]) {
    var lengthResults = results.length; //9
    var datesGrouped: Date[] = [];
    var secondsGrouped: number = 0;
    results.map((res) => {
      datesGrouped.push(new Date(res.data));
    });
    for (let i = 0; i < lengthResults - 1; i++) {
      var diffTime = Math.abs(
        datesGrouped[i].getTime() - datesGrouped[i + 1].getTime()
      );
      var diffSeconds = Math.ceil(diffTime / 1000);
      secondsGrouped = secondsGrouped + diffSeconds;
    }
    this.timeOfProduction = secondsGrouped / lengthResults;
    this.timeOfProduction = this.timeOfProduction / 3600;
  }

  show() {
    var newResults: Nodemcu[] = [];
    this.data = [];
    this.state = [];
    this.counter = [];
    this.dataSource = [];
    this.chartProduction?.destroy();
    this.chartState?.destroy();
    if (this.minDate != 0 && this.maxDate != 0) {
      this.results.map((res) => {
        if (res.data >= this.minDate && res.data <= this.maxDate) {
          newResults.push(res);
          this.dataSource.push(res);
          var data = new Date(res.data);
          this.data.push(data.toLocaleString());
          this.state.push(res.state);
          this.counter.push(res.counter);
        }
      });
    } else {
      this.results.map((res) => {
        var data = new Date();
        var newDate = new Date(res.data);
        if (
          newDate.getDay() == data.getDay() &&
          newDate.getMonth() == data.getMonth() &&
          newDate.getFullYear() == data.getFullYear()
        ) {
          newResults.push(res);
          this.dataSource.push(res);
          var data = new Date(res.data);
          this.data.push(data.toLocaleString());
          this.state.push(res.state);
          this.counter.push(res.counter);
        }
      });
    }
    this.getTimeProduction(newResults);
    this.getNumberCycles(newResults);
    this.chargeGraphs();
    this.getDiffDate(newResults);
  }
}

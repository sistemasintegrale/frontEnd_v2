import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { DashboardService } from 'src/app/services/main/dashboard.service';
import { DashboardDataService } from './dashboard-data.service';
 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor(
    private dasboardService : DashboardService,
    public dasboardData : DashboardDataService
    ){}
  ngOnInit(): void {
    this.dasboardService.get(1).subscribe(res=>{
      const data =  JSON.parse(res)
      let labels = Object.keys(data[0]);
      labels.shift()
      let montosol : number[] = Object.values(data[0]);
      montosol.shift()
      let montodol : number[] = Object.values(data[1]);
      montodol.shift()
      this.dasboardData.leabels = labels;
      this.dasboardData.montoSol = montosol;
      this.dasboardData.MontoDol = montodol;
    })
  }
}

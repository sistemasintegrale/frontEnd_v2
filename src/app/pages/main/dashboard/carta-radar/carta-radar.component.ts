import { ChartConfiguration, ChartType, ChartDataset } from 'chart.js';
import { Component } from '@angular/core';
import { DashboardService } from 'src/app/services/main/dashboard.service';
import { environment } from 'src/environments/environments';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DashboardDataService } from '../dashboard-data.service';
const connNG = environment.CONN_NOVAGLASS;
const connNM = environment.CONN_NOVAMOTOS;
@Component({
  selector: 'app-carta-radar',
  templateUrl: './carta-radar.component.html',
  styleUrls: []
})
export class CartaRadarComponent {
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'radar';
  public barChartLegend = true;

  public barChartData: ChartDataset[] = [

  ];

  constructor(
    private dasboardService: DashboardDataService,
  ) { }
  ngOnInit(): void {
    this.dasboardService.Data.subscribe(
      res => {
        this.barChartLabels = [];
        this.barChartData = [];
        this.barChartLabels = (res.Labels);
        this.barChartData.push({ data: res.MontoSol, label: 'Facturado S/' });
        this.barChartData.push({ data: res.MontoDol, label: 'Facturado US/' })
      }
    )
  }
}

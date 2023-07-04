import { ChartConfiguration, ChartType, ChartDataset } from 'chart.js';
import { Component } from '@angular/core';
import { DashboardDataService } from '../dashboard-data.service';



@Component({
  selector: 'app-grafico-barras',
  templateUrl: './grafico-barras.component.html',
  styleUrls: []
})
export class GraficoBarrasComponent {



  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataset[] = [];

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

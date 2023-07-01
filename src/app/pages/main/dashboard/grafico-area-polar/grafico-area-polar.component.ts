import { ChartConfiguration, ChartType, ChartDataset } from 'chart.js';
import { Component } from '@angular/core';
import { DashboardService } from 'src/app/services/main/dashboard.service';

@Component({
  selector: 'app-grafico-area-polar',
  templateUrl: './grafico-area-polar.component.html',
  styleUrls: ['./grafico-area-polar.component.css']
})
export class GraficoAreaPolarComponent {
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true
  };
  public barChartLabels: string[] = []
  public barChartType: ChartType = 'polarArea';
  public barChartLegend = true;

  public barChartData: ChartDataset[] = [

  ];

  constructor(
    private dasboardService: DashboardService
  ) { }

  ngOnInit(): void {

    this.dasboardService.get(1).subscribe(res => {
      const data = JSON.parse(res)
      let labels: string[] = Object.keys(data[0]);
      labels.shift()
      let montosol: number[] = Object.values(data[0]);
      montosol.shift()
      let montodol: number[] = Object.values(data[1]);
      montodol.shift()
      this.barChartLabels = labels;
      this.barChartData.push({ data: montosol, label: 'Facturados S/' })
      this.barChartData.push({ data: montodol, label: 'Facturados US/' })
    })
  }
}

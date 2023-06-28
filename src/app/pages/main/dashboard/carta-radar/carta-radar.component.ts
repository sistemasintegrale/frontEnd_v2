import { ChartConfiguration, ChartType, ChartDataset } from 'chart.js';
import { Component } from '@angular/core';

@Component({
  selector: 'app-carta-radar',
  templateUrl: './carta-radar.component.html',
  styleUrls: ['./carta-radar.component.css']
})
export class CartaRadarComponent {
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true
  };
  public barChartLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  public barChartType: ChartType = 'radar';
  public barChartLegend = true;

  public barChartData: ChartDataset[] = [
    { data: [ 65, 59, 80, 81, 56, 55,65, 59, 80, 81, 56, 55], label: 'Facturados' },   
  ];

  constructor() { }

  ngOnInit(): void {
  }
}

import { ChartConfiguration, ChartType, ChartDataset } from 'chart.js';
import { Component } from '@angular/core';

@Component({
  selector: 'app-grafico-circular',
  templateUrl: './grafico-circular.component.html',
  styleUrls: ['./grafico-circular.component.css']
})
export class GraficoCircularComponent {
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true
  };
  public barChartLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  public barChartType: ChartType = 'pie';
  public barChartLegend = true;

  public barChartData: ChartDataset[] = [
    { data: [ 65, 59, 80, 81, 56, 55,65, 59, 80, 81, 56, 55], label: 'Facturados' },   
  ];

  constructor() { }

  ngOnInit(): void {
  }
}

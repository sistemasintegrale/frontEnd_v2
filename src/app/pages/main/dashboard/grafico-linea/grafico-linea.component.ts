import { Component, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

 

@Component({
  selector: 'app-grafico-linea',
  templateUrl: './grafico-linea.component.html',
  styleUrls: ['./grafico-linea.component.css']
})
export class GraficoLineaComponent {
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true
  };
  public barChartLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  public barChartType: ChartType = 'line';
  public barChartLegend = true;

  public barChartData: ChartDataset[] = [
    { data: [ 65, 59, 80, 81, 56, 55,65, 59, 80, 81, 56, 55], label: 'Facturados' },   
  ];

  constructor() { }

  ngOnInit(): void {
  }
}

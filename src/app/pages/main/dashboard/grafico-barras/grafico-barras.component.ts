import { ChartConfiguration, ChartType, ChartDataset } from 'chart.js';
import { Component } from '@angular/core';
 

@Component({
  selector: 'app-grafico-barras',
  templateUrl: './grafico-barras.component.html',
  styleUrls: ['./grafico-barras.component.css']
})
export class GraficoBarrasComponent {
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true
  };
  public barChartLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataset[] = [
    { data: [ 65, 59, 80, 81, 56, 55,65, 59, 80, 81, 56, 55], label: 'Facturados',borderColor :'#a6d1f3',backgroundColor:'#8cc6f1'},   
  ];

  constructor() { }

  ngOnInit(): void {
  }


}

import { ChartConfiguration, ChartType, ChartDataset } from 'chart.js';
import { Component } from '@angular/core';
import { DashboardService } from 'src/app/services/main/dashboard.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environments';
const connNG = environment.CONN_NOVAGLASS;
const connNM = environment.CONN_NOVAMOTOS;
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
    private dasboardService: DashboardService,
    private authService: AuthService
  ) { }
    titulo : string = 'Dashboard Autos';
  ngOnInit(): void {
    let service = connNG;
    if (!this.authService.usuario.admin) {
      service = this.authService.usuario.codigoClienteNG !== 0 ? connNG : connNM ;
      this.titulo = service === connNG ? this.titulo : "Dashboard Motos";
    }
    this.dasboardService.get(service).subscribe(res => {
      const data = JSON.parse(res);
      if (data.length>1) {
        const data1 = data[1];
        const data2 = data[0];
        data.splice(0, 1, data1);
        data.splice(1, 1, data2);
      }
      let labels: string[] = Object.keys(data[0]);
      labels.shift()
      this.barChartLabels = labels;
      let montosol: number[] = Object.values(data[0]);
      montosol.shift()
      this.barChartData.push({ data: montosol, label: 'Facturados S/' })

      if (data.length >1){
        let montodol: number[] = Object.values(data[1]);
        montodol.shift()        
        this.barChartData.push({ data: montodol, label: 'Facturados US/' })
      }
    })
  }
}

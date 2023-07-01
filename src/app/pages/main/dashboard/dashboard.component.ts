import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { DashboardService } from 'src/app/services/main/dashboard.service';
import { DashboardDataService } from './dashboard-data.service';
import { environment } from 'src/environments/environments';
import { AuthService } from 'src/app/services/auth/auth.service';
 
const connNG = environment.CONN_NOVAGLASS;
const connNM = environment.CONN_NOVAMOTOS;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor(
    private dasboardService : DashboardService,
    public dasboardData : DashboardDataService,
    private authService: AuthService
    ){}
    titulo : string = 'Dashboard Autos';
  ngOnInit(): void {
    let service = connNG;
    if (!this.authService.usuario.admin) {
      service = this.authService.usuario.codigoClienteNG !== 0 ? connNG : connNM ;
      this.titulo = service === connNG ? this.titulo : "Dashboard Motos";
    }
    this.dasboardService.get(service).subscribe(res => {
      const data =  JSON.parse(res)
      if (data.length>1) {
        const data1 = data[1];
        const data2 = data[0];
        data.splice(0, 1, data1);
        data.splice(1, 1, data2);
      }
      let labels = Object.keys(data[0]);
      labels.shift()
      this.dasboardData.leabels = labels;
      let montosol : number[] = Object.values(data[0]);
      montosol.shift()
      this.dasboardData.montoSol = montosol;
      if (data.length >1){
        
        let montodol : number[] = Object.values(data[1]);
        montodol.shift()
        this.dasboardData.MontoDol = montodol;

      }
      
      
     
    })
  }
}

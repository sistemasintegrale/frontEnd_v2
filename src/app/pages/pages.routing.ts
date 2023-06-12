import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { ReporteAutosComponent } from './reports/reporte-autos/reporte-autos.component';
import { ReporteMotosComponent } from './reports/reporte-motos/reporte-motos.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { titulo: 'Main', subTitulo: 'Dashboard' } },
      //{ path: 'account-settings', component: AccountSettingsComponent , data: { titulo: 'Ajustes', subTitulo: 'Usuario' } },
      { path: 'reporte-historial-autos', component: ReporteAutosComponent, data: { titulo: 'Reportes', subTitulo: 'Historial Autos' } },
      { path: 'reporte-historial-motos', component: ReporteMotosComponent, data: { titulo: 'Reportes', subTitulo: 'Historial Motos' } },
      //matenimientos
      { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimientos', subTitulo: 'Usuarios' } },




    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRountingModule {

}

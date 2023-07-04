import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { ReporteAutosComponent } from './reports/reporte-autos/reporte-autos.component';
import { ReporteMotosComponent } from './reports/reporte-motos/reporte-motos.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { AuthGuard } from '../guards/auth.guard';
import { MiCuentaComponent } from './mantenimientos/mi-cuenta/mi-cuenta.component';

const routes: Routes = [
  {
    path: 'main',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Main', subTitulo: 'Dashboard' } },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'reportes',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'reporte-historial-autos', component: ReporteAutosComponent, data: { titulo: 'Reportes', subTitulo: 'Historial Autos' } },
      { path: 'reporte-historial-motos', component: ReporteMotosComponent, data: { titulo: 'Reportes', subTitulo: 'Historial Motos' } },
    ]
  },
  {
    path: 'mantenimientos',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimientos', subTitulo: 'Usuarios' } },
      { path: 'mi-perfil', component: MiCuentaComponent, data: { titulo: 'Mantenimientos', subTitulo: 'Mi Perfil' } },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRountingModule {

}

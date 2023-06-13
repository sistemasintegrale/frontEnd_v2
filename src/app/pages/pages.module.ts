import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
//import { MomentDateModule } from "@angular/material-moment-adapter";
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { ReporteAutosComponent } from './reports/reporte-autos/reporte-autos.component';
import { ReporteMotosComponent } from './reports/reporte-motos/reporte-motos.component';
import { MiCuentaComponent } from './mantenimientos/mi-cuenta/mi-cuenta.component';
import { UserDialogComponent } from './mantenimientos/usuarios/dialog/user-dialog/user-dialog.component';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ReporteAutosComponent,
    ReporteMotosComponent,
    UsuariosComponent,
    MiCuentaComponent,
    UserDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // MomentDateModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatInputModule,
    FormsModule
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
    //AccountSettingsComponent,
  ]
})
export class PagesModule { }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { OrdenReparacionList } from 'src/app/interfaces/orden-reparacion/orden-reparacion';
import { Marca } from 'src/app/interfaces/reporte-historial/marca';
import { Modelo } from 'src/app/interfaces/reporte-historial/modelo';
import { OrdenReparacion } from 'src/app/interfaces/reporte-historial/or';
import { Placa } from 'src/app/interfaces/reporte-historial/placa';
import { ReporteHistorialFilters } from 'src/app/interfaces/reporte-historial/reporte-historial-filters';
import { OrdenReparacionService } from 'src/app/services/orden-reparacion/orden-reparacion.service';
import { HistorialService } from 'src/app/services/reports/historial.service';
import { SelectsService } from 'src/app/services/reports/selects.service';
import { Excelv2Service } from 'src/app/services/shared/excelv2.service';
import { environment } from 'src/environments/environments';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte-autos',
  templateUrl: './reporte-autos.component.html',
  styleUrls: ['./reporte-autos.component.css']
})
export class ReporteAutosComponent implements OnInit {
  selectedProduct!: OrdenReparacionList;
  public reporte: OrdenReparacionList[] = [];
  public marcas: Marca[] = [];
  public modelos: Modelo[] = [];
  public placas: Placa[] = [];
  public ordenes: OrdenReparacion[] = [];
  public filters = {} as ReporteHistorialFilters;
  public formSubmitted = false;
  public cargandoExcel = false;
  public cargandoExcelDet = false;
  service = environment.CONN_NOVAGLASS;
  public cargando: boolean = false;
  constructor(
    private reporteService: HistorialService,
    private ordenReparacionservice: OrdenReparacionService,
    private fb: FormBuilder,
    private selectService: SelectsService,
    private excelServicev2: Excelv2Service,
  ) { }
  ngOnInit(): void {
  }


  public range: FormGroup = this.fb.group({
    fechaDesde: ['', [Validators.required]],
    fechaHasta: ['', [Validators.required]],
    marca: [0],
    modelo: [0],
    placa: [0],
    orden: [0],
  });



  cargarMarca() {
    this.selectService.cargarSelectMarca(this.service, this.filters)
      .subscribe(res => this.marcas = res.data)
  }

  cargarModelo() {
    this.selectService.cargarSelectModelo(this.service, this.filters)
      .subscribe(res => this.modelos = res.data)
  }

  cargarPlaca() {
    this.selectService.cargarSelectPlaca(this.service, this.filters)
      .subscribe(res => this.placas = res.data)
  }

  cargarOR() {
    this.selectService.cargarSelectOR(this.service, this.filters)
      .subscribe(res => this.ordenes = res.data)
  }

  buscar() {
    this.cargarReporte();
  }

  cargarReporte() {
    this.cargando = true;
    this.getFilters();
    this.ordenReparacionservice.getOrdenReparacion(this.filters, this.service).subscribe((resp) => {
      this.reporte = JSON.parse(resp.data);
      this.cargando = false;
    });
  }

  async cargarCombos() {
    if (this.range.get('fechaDesde')?.value === '' || this.range.get('fechaHasta')?.value === '')
      return;
    this.getFilters();

    await Promise.all([
      this.cargarMarca(),
      this.cargarModelo(),
      this.cargarPlaca(),
      this.cargarOR(),
    ]);
  }

  getFilters() {
    this.filters.fechaDesde = moment(this.range.value.fechaDesde).format(
      'DD/MM/YYYY'
    );
    this.filters.fechaHasta = moment(this.range.value.fechaHasta).format(
      'DD/MM/YYYY'
    );
    this.filters.marca = this.range.value.marca;
    this.filters.modelo = this.range.value.modelo;
    this.filters.placa = this.range.value.placa;
    this.filters.orden = this.range.value.orden;

  }

  exportarExcel() {
    this.cargandoExcel = true;
    this.getFilters();
    this.reporteService.cargarReporteHistorialExcel(this.filters, this.service)
      .subscribe(resp => {
        if (resp.isSucces) {
          const data = JSON.parse(resp.data)
          const colums = Object.keys(data[0])
          this.excelServicev2.exportar('Reporte Historial Autos', `Fecha desde: ${this.filters.fechaDesde}   hasta :${this.filters.fechaHasta}`, colums, data, null, 'Reporte', 'Sheet1');
        }
        else
          Swal.fire(
            'Información del sistema?',
            'No se encontraron registros',
            'error'
          )
        this.cargandoExcel = false;
      });

  }

  exportarExcelDet() {
    this.cargandoExcelDet = true;
    this.getFilters();
    this.reporteService.cargarReporteHistorialExcelDet(this.filters, this.service)
      .subscribe(resp => {

        if (resp.isSucces) {

          const data = JSON.parse(resp.data)
          const colums = Object.keys(data[0])
          this.excelServicev2.exportar('Reporte Historial Autos', `Fecha desde: ${this.filters.fechaDesde}   hasta :${this.filters.fechaHasta}`, colums, data, null, 'Reporte', 'Sheet1');
        }
        else
          Swal.fire(
            'Información del sistema?',
            'No se encontraron registros',
            'error'
          )
        this.cargandoExcelDet = false;
      });

  }


}

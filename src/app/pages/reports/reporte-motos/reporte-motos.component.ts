import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';
import { Marca } from 'src/app/interfaces/reporte-historial/marca';
import { Modelo } from 'src/app/interfaces/reporte-historial/modelo';
import { OrdenReparacion } from 'src/app/interfaces/reporte-historial/or';
import { Placa } from 'src/app/interfaces/reporte-historial/placa';
import { ReporteHistorialFilters } from 'src/app/interfaces/reporte-historial/reporte-historial-filters';
import { ReporteHistorialResponse } from 'src/app/models/reporte-historial/reporte-historial-response';
import { PaginatorLabelService } from 'src/app/services/custom/paginator-label.service';
import { HistorialService } from 'src/app/services/reports/historial.service';
import { SelectsService } from 'src/app/services/reports/selects.service';
import { ExcelService } from 'src/app/services/shared/excel.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-reporte-motos',
  templateUrl: './reporte-motos.component.html',
  styleUrls: ['./reporte-motos.component.css']
})
export class ReporteMotosComponent {
  public reporte: ReporteHistorialResponse[] = [];
  public marcas: Marca[] = [];
  public modelos: Modelo[] = [];
  public placas: Placa[] = [];
  public ordenes: OrdenReparacion[] = [];
  public filters = {} as ReporteHistorialFilters;
  public formSubmitted = false;
  public totalReporte: number = 0;
  public desde: number = 0;
  public hasta: number = 10;
  service = environment.CONN_NOVAMOTOS;
  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;
  public cargando: boolean = false;
  public cantidadRequeridaAnt: number = 10;
  public cargandoExcel = false;
  constructor(
    private reporteService: HistorialService,
    private fb: FormBuilder,
    private customPaginatorLabel: PaginatorLabelService,
    private selectService: SelectsService,
    private excelService : ExcelService
  ) { }
  ngOnInit(): void {
    this.customPaginatorLabel.translateMatPaginator(this.paginator);

  }


  public range: FormGroup = this.fb.group({
    fechaDesde: ['', [Validators.required]],
    fechaHasta: ['', [Validators.required]],
    marca: [0],
    modelo: [0],
    placa: [0],
    orden: [0],
  });

  getPaginationData(event: PageEvent): PageEvent {
    if (this.cantidadRequeridaAnt !== event.pageSize) {
      this.paginator.pageIndex = 0;
      this.desde = 0;
      this.hasta = event.pageSize;
      this.cantidadRequeridaAnt = event.pageSize;
      if (this.range.invalid) return event;
    } else {
      const newIndex = event.pageIndex + 1;
      this.hasta = event.pageSize * newIndex;
      this.desde = this.hasta - event.pageSize;
    }
    this.cargarReporte();
    return event;
  }

  cargarMarca() {
    debugger
    this.selectService.cargarSelectMarca(this.service, this.filters)
      .subscribe(
        {
          next: (res => {
            this.marcas = res.data;
          })
        }
      )
  }

  cargarModelo() {
    this.selectService.cargarSelectModelo(this.service, this.filters)
      .subscribe(
        {
          next: (res => {
            this.modelos = res.data;
          })
        }
      )
  }

  cargarPlaca() {
    this.selectService.cargarSelectPlaca(this.service, this.filters)
      .subscribe(
        {
          next: (res => {
            this.placas = res.data;
          })
        }
      )
  }

  cargarOR() {
    this.selectService.cargarSelectOR(this.service, this.filters)
      .subscribe(
        {
          next: (res => {
            this.ordenes = res.data;
          })
        }
      )
  }

  buscar(){
    this.paginator.pageIndex = 0;
    this.desde = 0;
    this.hasta = 10;
    this.cargarReporte();
  }

  cargarReporte() {
    
    this.cargando = true;
    this.getFilters();
    this.reporteService.cargarReporteHistorial(this.filters, this.service).subscribe((resp) => {
      this.reporte = resp.data.data;
      this.totalReporte = resp.cantidad;
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
 
    this.filters.desde = this.desde;
    this.filters.hasta = this.hasta;
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
 
  exportarExcel(){  
    this.cargandoExcel = true;
    this.getFilters();
    this.reporteService.cargarReporteHistorialExcel(this.filters, this.service)
    .subscribe(resp =>{
      this.excelService.exportAsExcelFile(resp,'Resporte Historial Motos');
      this.cargandoExcel = false;
    });
    
  }
}

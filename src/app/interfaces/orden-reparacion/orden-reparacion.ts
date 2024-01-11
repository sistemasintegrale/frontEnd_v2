export interface OrdenReparacionList {
    id: number,
    numeroOrden: string, 
    fechaOrden: string,
    ordenCompra : string, 
    cliente: string,
    placa: string,
    marca: string,
    modelo: string,
    anio: string,
    situacion: string,
    numeroDocumento : string,
    fechaDocumento : string,      
    netoOR : number,
    importeOR : number,
    moneda : string,
    netoDocumento : number,
    totalDocuemnto : number
}

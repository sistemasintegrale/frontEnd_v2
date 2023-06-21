import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  

  constructor() { }
  menu: any[] = [
    {
      titulo: 'Main',
      submenu: [
        {
          titulo: 'Dashboard',
          url: '/dashboard',
          icono: 'ni ni-tv-2',
          color: 'text-blue-500'
        }
      ]
    },
    {
      titulo: 'Reportes',
      submenu: [
        {
          titulo: 'Historial Autos',
          url: 'reporte-historial-autos',
          icono: 'ni ni-single-copy-04',
          color: 'text-orange-500'
        },
        {
          titulo: 'Historial Motos',
          url: 'reporte-historial-motos',
          icono: 'ni ni-collection',
          color: 'text-emerald-500'
        }
      ]
    },
    {
      titulo: 'Mantenimientos',
      submenu: [
        {
          titulo: 'Usuarios',
          url: 'usuarios',
          icono: 'fas fa-users',
          color: 'text-cyan-500'
        },
        {
          titulo: 'Mi Perfil',
          url: 'mi-perfil',
          icono: 'fas fa-user',
          color: 'text-red-500'
        }
      ]
    }
  ]

  menu_user: any[] = [
    {
      titulo: 'Main',
      submenu: [
        {
          titulo: 'Dashboard',
          url: '/dashboard',
          icono: 'ni ni-tv-2',
          color: 'text-blue-500'
        }
      ]
    },
    {
      titulo: 'Reportes',
      submenu: [
        {
          titulo: 'Historial Autos',
          url: 'reporte-historial-autos',
          icono: 'ni ni-single-copy-04',
          color: 'text-orange-500'
        },
        {
          titulo: 'Historial Motos',
          url: 'reporte-historial-motos',
          icono: 'ni ni-collection',
          color: 'text-emerald-500'
        }
      ]
    },
    {
      titulo: 'Mantenimientos',
      submenu: [
        {
          titulo: 'Mi Perfil',
          url: 'mi-perfil',
          icono: 'fas fa-user',
          color: 'text-red-500'
        }
      ]
    }
  ]
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-listado-grupos',
  templateUrl: './listado-grupos.component.html',
  styleUrls: ['./listado-grupos.component.scss'],
})
export class ListadoGruposComponent {
  jefesDeGrupo: any[] = [
    { nombre: 'Jefe 1' },
    { nombre: 'Jefe 2' },
    // Agrega más Jefes de Grupo según tus datos
  ];
  prestamistasAsignados: any[] = [];

  seleccionarJefe(jefe: any) {
    // Aquí puedes agregar lógica para cargar los prestamistas asignados
    // a este jefe y actualizar la variable prestamistasAsignados
  }
}

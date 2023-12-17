import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import Swal from 'sweetalert2';
import { PrestamoService } from 'src/app/services/prestamo.service';
import { Prestamo } from 'src/app/interfaces/prestamo';
import { el } from 'date-fns/locale';
import { EmpleadoService } from 'src/app/services/empleado.service';
import jsPDF from 'jspdf';
import autoTable, { Row } from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { CuotaPrestamo } from 'src/app/interfaces/cuota-prestamo';

@Component({
  templateUrl: './consulta-prestamo.component.html',
  styleUrls: ['./consulta-prestamo.component.scss'],
})
export class ConsultaPrestamoComponent {
  login: any = {};
  listaPrestamos: Prestamo[] = [];
  listaPrestamistas: any[] = [];
  filtroEstado: string = '0';
  filtroPrestamista: string = '0';
  PrestamistaSleccionado: any = {};
  porcentajeInteres: number = 60;

  constructor(
    private router: Router,
    private solicitudService: SolicitudService,
    private spinnerService: SpinnerService,
    private prestamoService: PrestamoService,
    private loginService: LoginService,
    private empleadoService: EmpleadoService
  ) {
    // Obtener datos de autentificacion
    this.loginService.getAuthenticated().subscribe((data) => {
      if (data) {
        let jsonText = localStorage.getItem('login');
        this.login = JSON.parse(jsonText ? jsonText : '');
        console.log(this.login);
      } else {
        this.router.navigate(['/login']);
      }
    });

    //Obtener Prestamistas
    this.empleadoService
      .getPrestamistasByJefePrestamista(this.login.idUsuario)
      .subscribe((data: any) => {
        if (data.success === true) {
          this.listaPrestamistas = data.data;
        }
      });

    //listar prestamos según perfil
    console.log(this.login.idPerfil);

    if (this.login.idPerfil === 2) {
      this.prestamoService
        .getPrestamosByJefePrestamista(this.login.idUsuario)
        .subscribe((data: any) => {
          if (data.success === true) {
            if (this.filtroEstado !== '0') {
              this.listaPrestamos = data.data.filter(
                (x: Prestamo) => x.estado?.toString() === this.filtroEstado
              );
            } else {
              this.listaPrestamos = data.data;
            }
          }
        });
    } else if (this.login.idPerfil === 3) {
      this.prestamoService
        .getPrestamosByPrestamista(this.login.idUsuario)
        .subscribe((data: any) => {
          if (data.success === true) {
            if (this.filtroEstado !== '0') {
              this.listaPrestamos = data.data.filter(
                (x: Prestamo) => x.estado?.toString() === this.filtroEstado
              );
            } else {
              this.listaPrestamos = data.data;
            }
            let valueT = this.listaPrestamos[0]?.cuotasPrestamo?.reduce(
              (suma, cuota) =>
                suma + (cuota.montoPendiente ? cuota.montoPendiente : 0),
              0
            );
            console.log('Value T', valueT?.toFixed(2));
          }
        });
    } else if (this.login.idPerfil === 4) {
      this.prestamoService
        .getPrestamosByPrestatario(this.login.idUsuario)
        .subscribe((data: any) => {
          if (data.success === true) {
            if (this.filtroEstado !== '0') {
              this.listaPrestamos = data.data.filter(
                (x: Prestamo) => x.estado?.toString() === this.filtroEstado
              );
            } else {
              this.listaPrestamos = data.data;
            }
          }
        });
    }
  }

  filtrarPrestamos() {
    if (this.login.idPerfil === 2) {
      this.prestamoService
        .getPrestamosByJefePrestamista(this.login.idUsuario)
        .subscribe((data: any) => {
          if (data.success === true) {
            if (this.filtroEstado !== '0') {
              this.listaPrestamos = data.data.filter(
                (x: Prestamo) => x.estado?.toString() === this.filtroEstado
              );
            } else {
              this.listaPrestamos = data.data;
            }
          }
        });
    } else if (this.login.idPerfil === 3) {
      this.prestamoService
        .getPrestamosByPrestamista(this.login.idUsuario)
        .subscribe((data: any) => {
          if (data.success === true) {
            if (this.filtroEstado !== '0') {
              this.listaPrestamos = data.data.filter(
                (x: Prestamo) => x.estado?.toString() === this.filtroEstado
              );
            } else {
              this.listaPrestamos = data.data;
            }
          }
        });
    } else if (this.login.idPerfil === 4) {
      this.prestamoService
        .getPrestamosByPrestatario(this.login.idUsuario)
        .subscribe((data: any) => {
          if (data.success === true) {
            if (this.filtroEstado !== '0') {
              this.listaPrestamos = data.data.filter(
                (x: Prestamo) => x.estado?.toString() === this.filtroEstado
              );
            } else {
              this.listaPrestamos = data.data;
            }
          }
        });
    }
  }

  filtrarPrestamosByPrestamista() {
    //Obtener el prestamista seleccionado

    if (this.filtroPrestamista === '0') {
      this.filtrarPrestamos();
      return;
    }

    this.PrestamistaSleccionado = this.listaPrestamistas.find(
      (x) => x.idUsuario === Number(this.filtroPrestamista)
    );

    console.log('Prestamista Seleccionado', this.PrestamistaSleccionado);

    this.prestamoService
      .getPrestamosByPrestamista(Number(this.filtroPrestamista))
      .subscribe(
        (data: any) => {
          if (data.success === true) {
            this.listaPrestamos = data.data;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  verCuotas(prestamo: Prestamo) {
    const parametros: NavigationExtras = {
      state: {
        prestamo: prestamo,
      },
    };

    this.router.navigate(['/consulta-cuotas', prestamo.idPrestamo], parametros);
  }

  //cantidad de cuotas pendientes
  cantidadCuotasPendientes(cuotas: any[]) {
    return cuotas.filter((x) => x.estado !== 3).length;
  }

  // cantidad de cuotas pagadas
  cantidadCuotasPagadas(cuotas: any[]) {
    return cuotas.filter((x) => x.estado === 3).length;
  }

  //suma de monto pendiente = monto prestado - monto pagado
  // montoPendiente(cuotas: CuotaPrestamo[], montoPrestado: number) {
  //   const total = cuotas.reduce(
  //     (suma, cuota) => suma + (cuota.montoPagado ? cuota.montoPagado : 0),
  //     0
  //   );
  //   console.log('Total', total);
  //   console.log('Monto Prestado', montoPrestado);
  //   return (montoPrestado - total).toFixed(2);
  // }

  montoPendiente(cuotas: any[], montoPrestado: number) {
    const total = cuotas.reduce(
      (suma, cuota) => suma + (cuota.montoPendiente ? cuota.montoPendiente : 0),
      0
    );
    return total.toFixed(2);
  }

  //suma de monto pagado
  montoPagado(cuotas: any[]) {
    const total = cuotas.reduce(
      (suma, cuota) => suma + (cuota.montoPagado ? cuota.montoPagado : 0),
      0
    );
    return total.toFixed(2);
  }

  //Calcualr rentabilidad: La rentabilidad es el interes pagado menos el monto prestado
  rentabilidad(cuotas: CuotaPrestamo[], montoPrestado: number) {
    const totalPagado = cuotas.reduce(
      (suma, cuota) => suma + (cuota.montoPagado ? cuota.montoPagado : 0),
      0
    );
    const rentabilidad: number =
      (totalPagado / montoPrestado) * this.porcentajeInteres;
    return rentabilidad.toFixed(2);
    // return ((rentabilidad * -1 - 100) * -1).toFixed(2);
    //return rentabilidad >= 0 ? rentabilidad.toFixed(2) : (0.0).toFixed(2);
  }

  //Obtener Prestamista seleccionado
  obtenerPrestamista(idPrestamista: number) {
    return this.listaPrestamistas.find(
      (x) => x.idPrestamista === idPrestamista
    );
  }

  //Verififcar si el prestamo esta vencido
  verificarVencimiento(fechaVencimiento: string) {
    const fechaActual = new Date();
    const fechaVencimientoDate = new Date(fechaVencimiento);
    return fechaActual > fechaVencimientoDate;
  }

  exportarComoPDF() {
    const doc = new jsPDF();

    // Agregar título
    doc.setFontSize(18);
    doc.text('Reporte de Rentabildiad de Prestamos', 60, 25);

    // Agregar imagen
    const imgData = '../../../assets/prestamo.png';
    doc.addImage(imgData, 'JPEG', 15, 10, 20, 20);

    autoTable(doc, {
      html: '#tblPrestamos',
      margin: { top: 30, left: 4, right: 4 },
    });
    const fecha = new Date();
    const fechaFormato = fecha
      .toISOString()
      .replace(/[^0-9]/g, '')
      .slice(0, 14);
    const nombreArchivo = `PRS_Rentabilidad_${fechaFormato}.pdf`;
    doc.save(nombreArchivo);
  }

  async exportarComoExcel() {
    // Obtén la tabla del DOM
    const tabla = document.getElementById('tblPrestamos');
    if (!tabla) return;

    // Convierte la tabla en un libro de trabajo
    const wb = XLSX.utils.table_to_book(tabla, { sheet: 'Cuotas' });

    // Genera el nombre del archivo
    const fecha = new Date();
    const fechaFormato = fecha
      .toISOString()
      .replace(/[^0-9]/g, '')
      .slice(0, 14);
    const nombreArchivo = `PRS_Rentabilidad_${fechaFormato}.xlsx`;

    // Escribe el libro de trabajo en un archivo Excel
    XLSX.writeFile(wb, nombreArchivo);
  }
}

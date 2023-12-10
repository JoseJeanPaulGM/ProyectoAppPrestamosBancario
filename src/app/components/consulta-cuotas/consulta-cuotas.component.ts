import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { th } from 'date-fns/locale';
import Swal from 'sweetalert2';
import { CuotaPrestamo } from 'src/app/interfaces/cuota-prestamo';
import { CuotaPrestamoService } from 'src/app/services/cuota-prestamo.service';
import { Prestamo } from 'src/app/interfaces/prestamo';
import { LoginService } from 'src/app/services/login.service';
import { PrestamoService } from 'src/app/services/prestamo.service';
import jsPDF from 'jspdf';
import autoTable, { Row } from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  templateUrl: './consulta-cuotas.component.html',
  styleUrls: ['./consulta-cuotas.component.scss'],
})
export class ConsultaCuotasComponent {
  login: any = {};
  prestamo: Prestamo | undefined;
  cliente: string = '';
  numeroCuotaSeleccionada: number = 0;
  cuotaSeleccionada: CuotaPrestamo = {};
  montoAPagar: number = 0.0;
  mora: number = 10.0;

  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private router: Router,
    private cuotaPrestamoService: CuotaPrestamoService,
    private prestamoService: PrestamoService
  ) {
    this.loginService.getAuthenticated().subscribe((data) => {
      if (data) {
        let jsonText = localStorage.getItem('login');
        this.login = JSON.parse(jsonText ? jsonText : '');
        console.log(this.login);
      } else {
        this.router.navigate(['/login']);
      }
    });

    const parametros = this.route.snapshot.paramMap;

    //Obtener Prestamo por IdPrestamo
    this.prestamoService
      .getPrestamo(Number(parametros.get('idPrestamo')))
      .subscribe(
        (data: any) => {
          console.log('Prestamo => ', data.data);
          if (data.success === true) {
            this.prestamo = data.data;
            //Descontar 1 día la Fecha de Vencimiento , en formato YYYY-MM-DD
            this.prestamo?.cuotasPrestamo?.forEach((x) => {
              x.fechaVencimiento = new Date(
                new Date(x.fechaVencimiento!).setDate(
                  new Date(x.fechaVencimiento!).getDate() - 1
                )
              )
                .toISOString()
                .substring(0, 10);
            });

            //Obtener Usuario
            if (this.login.idPerfil !== 4) {
              console.log('idPrestatario => ', this.prestamo?.idPrestatario);
              this.loginService
                .obtenerUsuarioPorId(this.prestamo?.idPrestatario || 0)
                .subscribe(
                  (data: any) => {
                    console.log('Cliente => ', data.data);
                    if (data.success === true) {
                      this.cliente =
                        data.data.persona.nombres +
                        ' ' +
                        data.data.persona.apellidoPaterno +
                        ' ' +
                        data.data.persona.apellidoMaterno;
                    }
                  },
                  (error) => {
                    console.log(error);
                  }
                );
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  pagarCuota() {
    //Validar que la cuota anterior este pagada
    let cuotaAnterior = this.prestamo?.cuotasPrestamo?.find(
      (x) => x.numeroCuota === this.numeroCuotaSeleccionada - 1
    );
    console.log('Cuota Anterior', cuotaAnterior);
    if (cuotaAnterior !== undefined && cuotaAnterior?.estado !== 3) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe pagar la cuota anterior',
      });
      return;
    }

    //Validar que el monton a pagar sea numerico
    if (isNaN(this.montoAPagar)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe ingresar un monto numerico',
      });
      return;
    }

    //validar que el monto a pagar sea mayor a 0 y menor o igual al monto pendiente +  mora
    if (this.montoAPagar <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'Debe ingresar un monto mayor a 0.',
      });
      return;
    }

    if (this.montoAPagar > this.cuotaSeleccionada.montoPendiente! + this.mora) {
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        html: 'El monto a pagar no debe ser mayor al <strong>monto pendiente + la mora</strong>',
      });
      return;
    }

    if (
      this.mora > 0 &&
      this.cuotaSeleccionada.montoPendiente! < this.cuotaSeleccionada.monto! &&
      this.cuotaSeleccionada.montoPendiente! + this.mora < this.montoAPagar
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        html: 'Ya no se puede ingresar un pago parcial, el monto a pagar debe ser igual a <strong>monto pendiente + la mora</strong>',
      });
      return;
    }

    if (this.montoAPagar > 0) {
      this.cuotaSeleccionada.montoPagado = this.montoAPagar;
      this.cuotaSeleccionada.estado =
        this.cuotaSeleccionada.montoPendiente! -
          Number(this.cuotaSeleccionada.montoPagado) <=
        0
          ? 3
          : 2;
      this.cuotaSeleccionada.montoPendiente =
        this.cuotaSeleccionada.montoPendiente! - this.montoAPagar + this.mora;
      this.cuotaSeleccionada.usuarioModificacion = this.login.email;
      console.log('Cuota a Pagar =>', this.cuotaSeleccionada);
      this.cuotaPrestamoService
        .actualizarCuota(
          this.cuotaSeleccionada?.idCuotaPrestamo || 0,
          this.cuotaSeleccionada
        )
        .subscribe(
          (data: any) => {
            console.log(data);
            if (data.success === true) {
              //Obtener Prestamo por Id
              this.prestamoService
                .getPrestamo(this.prestamo?.idPrestamo || 0)
                .subscribe(
                  (data: any) => {
                    console.log('Prestamo => ', data.data);
                    if (data.success === true) {
                      this.prestamo = data.data;
                      this.prestamo?.cuotasPrestamo?.forEach((x) => {
                        x.fechaVencimiento = new Date(
                          new Date(x.fechaVencimiento!).setDate(
                            new Date(x.fechaVencimiento!).getDate() - 1
                          )
                        )
                          .toISOString()
                          .substring(0, 10);
                      });
                    }
                  },
                  (error) => {
                    console.log(error);
                  }
                );

              Swal.fire({
                icon: 'success',
                title: 'Exito',
                text: data.message,
              });
            }
            this.montoAPagar = 0.0;
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error.error.message,
            });

            this.montoAPagar = 0.0;
          }
        );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe ingresar un monto mayor a 0',
      });
    }
  }

  seleccionarCuota(cuota: CuotaPrestamo) {
    this.numeroCuotaSeleccionada = cuota.numeroCuota || 0;
    this.cuotaSeleccionada = cuota;

    let fechaActual = new Date();
    let fechaVencimiento = new Date(
      cuota.fechaVencimiento!.toString().substring(0, 10)
    );
    console.log('Fecha Actual', fechaActual);
    console.log('Fecha Vencimiento', fechaVencimiento);

    //Sacar la diferencia de dias entre la fecha actual y la fecha de vencimiento
    let diferencia: number = fechaActual.getTime() - fechaVencimiento.getTime();

    //La mora debe ser 5.00 por cada dia de retraso
    this.mora =
      fechaActual > fechaVencimiento
        ? 5.0 * Math.floor(diferencia / (1000 * 60 * 60 * 24))
        : 0.0;

    //Si el monto pendiente es menor al monto de la cuota, la mora es 0

    this.mora = cuota.montoPendiente! < cuota.monto! ? 0.0 : this.mora;
  }

  exportarComoPDF() {
    const doc = new jsPDF();

    // Agregar título
    doc.setFontSize(18);
    doc.text('Reporte de Prestamos Nro.' + this.prestamo?.idPrestamo, 60, 25);

    // Agregar imagen
    const imgData = '../../../assets/money_amount.png';
    doc.addImage(imgData, 'JPEG', 15, 10, 20, 20);

    autoTable(doc, { html: '#tblCuotas', margin: { top: 30 } });
    const fecha = new Date();
    const fechaFormato = fecha
      .toISOString()
      .replace(/[^0-9]/g, '')
      .slice(0, 14);
    const nombreArchivo = `PRS_${this.prestamo?.idPrestamo}_${fechaFormato}.pdf`;
    doc.save(nombreArchivo);
  }

  async exportarComoExcel() {
    // Obtén la tabla del DOM
    const tabla = document.getElementById('tblCuotas');
    if (!tabla) return;

    // Convierte la tabla en un libro de trabajo
    const wb = XLSX.utils.table_to_book(tabla, { sheet: 'Cuotas' });

    // Genera el nombre del archivo
    const fecha = new Date();
    const fechaFormato = fecha
      .toISOString()
      .replace(/[^0-9]/g, '')
      .slice(0, 14);
    const nombreArchivo = `PRS_${this.prestamo?.idPrestamo}_${fechaFormato}.xlsx`;

    // Escribe el libro de trabajo en un archivo Excel
    XLSX.writeFile(wb, nombreArchivo);
  }

  forrmatoDecimal(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const decimalPattern = /^\d+(\.\d{0,2})?$/;
    if (!decimalPattern.test(value)) {
      input.value = value.slice(0, -1);
    }
  }
}

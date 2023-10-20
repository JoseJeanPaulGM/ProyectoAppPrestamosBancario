import { Component } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Solitud } from 'src/app/interfaces/solitud';
import Swal from 'sweetalert2';
import { CuotaPrestamo } from 'src/app/interfaces/cuota-prestamo';
import { format } from 'date-fns';
import { el } from 'date-fns/locale';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss'],
})
export class SolicitudComponent {
  montoSolicitado = '1000'; // Valor inicial del rango
  montoSolicitadoRange = 1000;
  montoTotalSimulacion: number = 0;

  listaCuotasDefault: CuotaPrestamo[] = [
    {
      idPrestamo: 0,
      numeroCuota: 1,
      fechaVencimiento: new Date().toISOString().slice(0, 10),
      monto: 0,
      interes: 0,
      amortizacion: 0,
      saldo: 0,
    },
  ];

  rbt06cuotas = false;
  rbt12cuotas = true;
  rbt18cuotas = false;
  rbt24cuotas = false;

  selectedModelValue06: string = '12'; // Variable para almacenar el valor seleccionado
  selectedValue: string = '12'; // Variable para almacenar el valor seleccionado

  actualizarValorRango(event: any) {
    // this.montoSolicitado = event.target.value;
    this.montoSolicitado = this.formatNumberWithCommas(
      Number(event.target.value)
    );
  }

  formatearMonto(event: any) {
    // Obtén el valor actual del campo de entrada
    const textToFormat = event.target.value.replace(',', '');
    if (Number(textToFormat) >= 500) {
      const textValue = this.valorMasCercanoEnRango(Number(textToFormat), 500);

      this.montoSolicitado = this.formatNumberWithCommas(textValue);
      this.montoSolicitadoRange = Number(this.montoSolicitado.replace(',', ''));
    }
    if (Number(textToFormat) >= 10000) {
      this.montoSolicitado = this.formatNumberWithCommas(10000);
      this.montoSolicitadoRange = 10000;
    }
  }

  altualizarNumeroCuotas(event: any) {
    // this.rbt06cuotas = (event.target as HTMLInputElement).checked;
    // this.rbt12cuotas = (event.target as HTMLInputElement).checked;
    // this.rbt18cuotas = (event.target as HTMLInputElement).checked;
    // this.rbt24cuotas = (event.target as HTMLInputElement).checked;
  }

  calcularCuota(event: any) {
    this.styleSelected(event.target.textContent);
  }

  formatNumberWithCommas(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  calcularCuotas(
    montoTotal: number,
    porcentajeInteres: number,
    numeroCuotas: number,
    fechaInicio: Date
  ): CuotaPrestamo[] {
    console.log(montoTotal, porcentajeInteres, numeroCuotas, fechaInicio);

    const tasaInteresMensual = porcentajeInteres / 12; // Interés anual

    const cuotaMensual =
      montoTotal *
      (tasaInteresMensual /
        (1 - Math.pow(1 + tasaInteresMensual, -numeroCuotas)));

    const cuotas: CuotaPrestamo[] = [];

    for (let cuota = 1; cuota <= numeroCuotas; cuota++) {
      const interesMensual = montoTotal * tasaInteresMensual;
      const amortizacion = cuotaMensual - interesMensual;
      const fechaSolicitud = new Date(fechaInicio);
      const fechaVencimiento = new Date(fechaInicio);

      fechaVencimiento.setMonth(fechaVencimiento.getMonth() + cuota);
      // fechaSolicitud.setMonth(fechaSolicitud.getMonth() + 1 + cuota);

      // console.log(
      //   'Diferencias días: ' + cuota,
      //   fechaSolicitud.getDate() + 1,
      //   fechaSolicitud.getMonth() + 1,
      //   fechaVencimiento.getMonth() + 1
      // );

      // if (
      //   fechaSolicitud.getDate() + 1 === 31 &&
      //   fechaSolicitud.getMonth() !== fechaVencimiento.getMonth()
      // ) {
      //   fechaVencimiento.setDate(1);
      // } else if (
      //   fechaSolicitud.getDate() + 1 === 28 &&
      //   fechaSolicitud.getMonth() !== fechaVencimiento.getMonth()
      // ) {
      //   fechaVencimiento.setDate(3);
      // } else if (
      //   fechaSolicitud.getDate() + 1 === 29 &&
      //   fechaSolicitud.getMonth() !== fechaVencimiento.getMonth()
      // ) {
      //   fechaVencimiento.setDate(2);
      // }

      console.log(
        fechaInicio.getMonth() + 1,
        fechaVencimiento.getMonth(),
        fechaVencimiento.getDate() + 1
      );

      // if (
      //   fechaInicio.getMonth()+1 === 2 &&
      //   fechaVencimiento.getDate() + 1 === 28
      // ) {
      //   console.log('fechaVencimiento === 28', fechaVencimiento.getDate());
      //   fechaVencimiento.setDate(fechaVencimiento.getDate() + 3);
      // } else if (
      //   fechaVencimiento.getMonth() === 2 &&
      //   fechaVencimiento.getDate() + 1 === 29
      // ) {
      //   console.log('fechaVencimiento === 29', fechaVencimiento.getDate());
      //   fechaVencimiento.setDate(fechaVencimiento.getDate() + 2);
      // } else if (fechaVencimiento.getDate() + 1 === 30) {
      //   console.log('fechaVencimiento === 30', fechaVencimiento.getDate());
      //   fechaVencimiento.setDate(fechaVencimiento.getDate() + 1);
      // } else {
      //   console.log('fechaVencimiento === 31', fechaVencimiento.getDate());
      //   fechaVencimiento.setDate(fechaVencimiento.getDate());
      // }

      this.montoTotalSimulacion += Number(cuotaMensual.toFixed(2));

      cuotas.push({
        idPrestamo: 0,
        numeroCuota: cuota,
        fechaVencimiento: format(
          fechaVencimiento.setDate(
            fechaVencimiento.getMonth() === 2
              ? fechaVencimiento.getDate() + 1
              : fechaVencimiento.getDate()
          ),
          'dd-MM-yyyy'
        ),
        monto: Number(cuotaMensual.toFixed(2)),
        interes: interesMensual,
        amortizacion: amortizacion,
        saldo: montoTotal,
      });

      montoTotal -= amortizacion;
    }

    return cuotas;
  }

  usuario: Usuario = {
    email: '',
    contrasena: '',
    persona: {
      nombres: 'Jacinto',
      apellidoPaterno: '',
      apellidoMaterno: '',
      numeroDocumento: '',
      direccion: '',
      telefono: '',
      email: '',
      estado: 1,
      tipoDocumento: 1,
    },
    estado: 1,
    idPerfil: 3,
  };

  solitud: Solitud = {
    idSolicitud: 0,
    monto: 0,
    cuotas: 0,
    fecha: '',
    estado: 1,
  };
  constructor() {}
  ngOnInit(): void {
    this.listaCuotasDefault = this.calcularCuotas(
      this.montoSolicitadoRange,
      0.59,
      12,
      new Date()
    );

    // Swal.fire({
    //   title: 'Lo sentimos...',
    //   text: 'Usted ya cuenta con un prestamos activo.',
    //   icon: 'info',
    //   confirmButtonText: 'Aceptar',
    //   confirmButtonColor: '#197566',
    // });
  }

  styleSelected(input: string) {
    switch (input) {
      case '06':
        this.rbt06cuotas = true;
        this.rbt12cuotas = false;
        this.rbt18cuotas = false;
        this.rbt24cuotas = false;
        break;
      case '12':
        this.rbt06cuotas = false;
        this.rbt12cuotas = true;
        this.rbt18cuotas = false;
        this.rbt24cuotas = false;
        break;
      case '18':
        this.rbt06cuotas = false;
        this.rbt12cuotas = false;
        this.rbt18cuotas = true;
        this.rbt24cuotas = false;
        break;

      default:
        this.rbt06cuotas = false;
        this.rbt12cuotas = false;
        this.rbt18cuotas = false;
        this.rbt24cuotas = true;
        break;
    }
  }

  valorMasCercanoEnRango(numero: number, rango: number) {
    if (numero < rango) {
      return rango;
    }
    const cociente = Math.floor(numero / rango);

    const valorMenor = cociente * rango;
    const valorMayor = (cociente + 1) * rango;

    if (Math.abs(numero - valorMenor) < Math.abs(numero - valorMayor)) {
      return valorMenor;
    } else {
      return valorMayor;
    }
  }
}

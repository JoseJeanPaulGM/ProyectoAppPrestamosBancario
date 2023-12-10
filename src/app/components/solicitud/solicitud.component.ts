import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Solitud } from 'src/app/interfaces/solitud';
import Swal from 'sweetalert2';
import { CuotaPrestamo } from 'src/app/interfaces/cuota-prestamo';
import { format } from 'date-fns';

import { PrestamoService } from 'src/app/services/prestamo.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { CuentasBancariasService } from 'src/app/services/cuentas-bancarias.service';
import { CuentasBancarias } from 'src/app/interfaces/cuenta-bancaria';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss'],
})
export class SolicitudComponent implements OnInit {
  montoSolicitado = '5,000'; // Valor inicial del rango
  montoSolicitadoRange = 5000;
  montoTotalSimulacion: number = 0;
  login: any;
  numeroCuotas: number = 12;

  entidadBancaria: string = '2';

  rbt06cuotas = false;
  rbt12cuotas = true;
  rbt18cuotas = false;
  rbt24cuotas = false;

  selectedModelValue06: string = '12'; // Variable para almacenar el valor seleccionado
  selectedValue: string = '12'; // Variable para almacenar el valor seleccionado

  cuenta: CuentasBancarias = {
    idCuentaBancaria: 0,
    idUsuario: 0,
    numeroCuenta: '',
    banco: '2',
    estado: 1,
  };

  listaCuentasBancarias: CuentasBancarias[] = [];

  solitud: Solitud = {
    idSolicitud: 0,
    idPrestatario: 0,
    idPrestamista: 0,
    monto: 0,
    concepto: '1',
    interes: 60,
    cantidadCuotas: 0,
    cuentaBancaria: '',
    observaciones: '',
    estado: 1,
    usuarioCreacion: '',
  };

  listaCuotasDefault: CuotaPrestamo[] = [
    {
      numeroCuota: 1,
      fechaVencimiento: new Date().toISOString().slice(0, 10),
      monto: 0,
      interes: 0,
    },
  ];

  @ViewChild('modalCuentasBancarias') modalCuentasBancarias: ElementRef;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private solicitudService: SolicitudService,
    private prestamoService: PrestamoService,
    private cuentasBancariasService: CuentasBancariasService
  ) {
    this.modalCuentasBancarias = ElementRef.prototype;
    this.loginService.getAuthenticated().subscribe((data) => {
      if (data) {
        let jsonText = localStorage.getItem('login');
        this.login = JSON.parse(jsonText ? jsonText : '');
      } else {
        this.router.navigate(['/login']);
      }
    });
    console.log(this.login);
    this.cuentasBancariasService
      .getCuentaBancaria(this.login.idUsuario)
      .subscribe(
        (response) => {
          console.log(response);
          this.listaCuentasBancarias = response.data;
          this.solitud.cuentaBancaria =
            this.listaCuentasBancarias[0].numeroCuenta || '';
          this.entidadBancaria = this.listaCuentasBancarias[0].banco || '2';
        },
        (error) => {
          console.log(error);
        }
      );
  }
  ngOnInit(): void {
    this.listaCuotasDefault = [];
    this.listaCuotasDefault = this.calcularCuotas(
      this.montoSolicitadoRange,
      0.6,
      12,
      new Date()
    );
  }

  cuentasBancarias() {}

  agregarCuenta() {
    if (this.cuenta.numeroCuenta!.length < 1) {
      Swal.fire({
        icon: 'error',
        title: 'Error de validación',
        text: 'Por favor, ingresa un número de cuenta.',
      });
      return; // Detén la ejecución
    }

    this.cuenta.idUsuario = this.login.idUsuario;

    console.log(this.cuenta);

    this.cuentasBancariasService.createCuentaBancaria(this.cuenta).subscribe(
      (response) => {
        console.log(response);
        this.listaCuentasBancarias.push(response.data);
        this.modalCuentasBancarias.nativeElement.click();
        this.solitud.cuentaBancaria = response.data.numeroCuenta;
        this.entidadBancaria = response.data.banco;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cuentaSeleccionada(banco: any) {
    this.entidadBancaria = banco.banco;
    this.solitud.cuentaBancaria = banco.numeroCuenta;
  }

  actualizarValorRango(event: any) {
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
    this.numeroCuotas = Number(event.target.textContent);
  }

  formatNumberWithCommas(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  simularPrestamo() {
    this.listaCuotasDefault = [];
    console.log(this.listaCuotasDefault);
    this.listaCuotasDefault = this.calcularCuotas(
      this.montoSolicitadoRange,
      (this.solitud.interes || 60) / 100,
      this.numeroCuotas,
      new Date()
    );
  }

  calcularCuotas(
    montoTotal: number,
    porcentajeInteres: number,
    numeroCuotas: number,
    fechaInicio: Date
  ): CuotaPrestamo[] {
    console.log(montoTotal, porcentajeInteres, numeroCuotas, fechaInicio);
    this.montoTotalSimulacion = 0;
    const tasaInteresMensual = porcentajeInteres / 12; // Interés anual

    const cuotaMensual =
      montoTotal *
      (tasaInteresMensual /
        (1 - Math.pow(1 + tasaInteresMensual, -numeroCuotas)));

    const cuotas: CuotaPrestamo[] = [];

    for (let cuota = 1; cuota <= numeroCuotas; cuota++) {
      const interesMensual = montoTotal * tasaInteresMensual;
      const capital = cuotaMensual - interesMensual;
      const fechaVencimiento = new Date(fechaInicio);

      fechaVencimiento.setMonth(fechaVencimiento.getMonth() + cuota);
      this.montoTotalSimulacion += Number(cuotaMensual.toFixed(2));

      cuotas.push({
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
        interes: Number(interesMensual.toFixed(2)),
      });

      montoTotal -= capital;
    }

    console.log(cuotas);
    return cuotas;
  }

  registrarSolicitud() {
    //Validar si el usuario tiene solictudes pendientes y prestamos activos
    this.prestamoService
      .validarPrestamo(this.login.idUsuario)
      .subscribe((response) => {
        console.log('Validación de Préstamo', response);
        if (response.success === true) {
          Swal.fire({
            icon: 'warning',
            title: 'Validación de Solicitud',
            text: response.message,
          });

          if (response.data.idPrestamo > 0) {
            this.router.navigate(['/consulta-prestamo']);
          } else {
            this.router.navigate(['/consulta-solicitud']);
          }
        } else {
          //registrar solicitud
          this.solitud.idPrestatario = this.login.idUsuario;
          this.solitud.idPrestamista = 0;
          this.solitud.monto = this.montoSolicitadoRange;

          this.solitud.cantidadCuotas = this.numeroCuotas;
          this.solitud.usuarioCreacion = this.login.email;
          this.solitud.estado = 1;
          this.solitud.interes = (this.solitud.interes || 70) / 100;

          if (this.solitud.monto < 1000) {
            Swal.fire({
              icon: 'error',
              title: 'Error de validación',
              text: 'El monto solicitado debe ser mayor a 1000 soles.',
            });
            return; // Detén la ejecución
          }

          if (
            !this.solitud.cuentaBancaria ||
            this.solitud.cuentaBancaria.length < 1
          ) {
            Swal.fire({
              icon: 'error',
              title: 'Error de validación',
              text: 'Por favor, seleccione una cuenta bancaria.',
            });
            return; // Detén la ejecución
          }

          const concepto =
            this.solitud.concepto === '1'
              ? 'Préstamos Personal'
              : this.solitud.concepto === '2'
              ? 'Préstamo Educación'
              : this.solitud.concepto === '3'
              ? 'Préstamo Vehicular'
              : 'Otros fines';

          this.solitud.concepto = concepto;
          //invoca al servicio
          this.solicitudService.createSolicitud(this.solitud).subscribe(
            (response) => {
              console.log(response);
              Swal.fire({
                icon: 'success',
                title: 'Solicitud registrada',
                text: 'Su solicitud ha sido registrada con éxito.',
              });
              this.router.navigate(['/consulta-solicitud']);
            },
            (error) => {
              console.log(error);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al registrar la solicitud.',
              });
            }
          );
        }
      });
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

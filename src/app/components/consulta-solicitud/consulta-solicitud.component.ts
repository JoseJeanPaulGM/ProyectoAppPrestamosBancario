import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { el } from 'date-fns/locale';
import { Router } from '@angular/router';
import { SolicitudService } from 'src/app/services/solicitud.service';
import Swal from 'sweetalert2';
import { SolicitudList } from 'src/app/interfaces/solicitud-list';
import { format } from 'date-fns';
import { CuotaPrestamo } from 'src/app/interfaces/cuota-prestamo';

@Component({
  templateUrl: './consulta-solicitud.component.html',
  styleUrls: ['./consulta-solicitud.component.scss'],
})
export class ConsultaSolicitudComponent implements OnInit {
  listaSolicitudes: SolicitudList[] = [];
  login: any;
  filtroEstado: string = '1';
  montoTotalSolicitado: number = 0;

  constructor(
    private router: Router,
    private solicitudService: SolicitudService,
    private loginService: LoginService
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

    if (this.login.idPerfil != 4) {
      this.solicitudService.getSolicitudes().subscribe(
        (data) => {
          //filtrar por estado
          this.listaSolicitudes = [...data.data].filter(
            (solicitud) => solicitud.estado == this.filtroEstado
          );
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.solicitudService
        .getSolicitudesByCliente(this.login.idUsuario)
        .subscribe(
          (data) => {
            //filtrar por estado
            // this.listaSolicitudes = [...data.data].filter(
            //   (solicitud) => solicitud.estado == this.filtroEstado
            // );
            this.listaSolicitudes = [...data.data];
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  filtrarSolicitudes() {
    if (this.filtroEstado === '1' && this.login.idPerfil != 4) {
      this.solicitudService.getSolicitudes().subscribe(
        (data) => {
          //filtrar por estado
          this.listaSolicitudes = [...data.data].filter(
            (solicitud) => solicitud.estado == this.filtroEstado
          );
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      if (this.login.idPerfil === 2) {
        this.solicitudService
          .getSolicitudesByJefePrestamista(this.login.idUsuario)
          .subscribe(
            (data) => {
              //filtrar por estado
              this.listaSolicitudes = [...data.data].filter(
                (solicitud) => solicitud.estado == this.filtroEstado
              );
            },
            (error) => {
              console.log(error);
            }
          );
      } else if (this.login.idPerfil === 3) {
        this.solicitudService
          .getSolicitudesByPrestamista(this.login.idUsuario)
          .subscribe(
            (data) => {
              //filtrar por estado
              this.listaSolicitudes = [...data.data].filter(
                (solicitud) => solicitud.estado == this.filtroEstado
              );
              console.log(this.listaSolicitudes);
            },
            (error) => {
              console.log(error);
            }
          );
      } else if (this.login.idPerfil === 4) {
        this.solicitudService
          .getSolicitudesByCliente(this.login.idUsuario)
          .subscribe(
            (data) => {
              this.listaSolicitudes = [...data.data].filter(
                (solicitud) => solicitud.estado == this.filtroEstado
              );
            },
            (error) => {
              console.log(error);
            }
          );
      }
    }
  }

  onMouseMove(event: MouseEvent) {
    const eventTarget = event.target as HTMLElement;
    if (eventTarget.tagName === 'I') {
      const posicion = eventTarget.getBoundingClientRect();

      const style = document.createElement('style');
      style.innerHTML = `
    .custom-tooltip-right:hover::after {
      position: fixed;
      top: ${posicion.top + 12}px;
      left: ${1313}px;
    }
  `;
      document.head.appendChild(style);
    }
  }

  aprobarSolicitud(solicitud: any) {
    //está seguro de aprobar la solicitud?
    Swal.fire({
      title: '¿Está seguro de aprobar la solicitud?',
      text: 'Se generará el préstamo',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#197566',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#b21f2d',
    }).then(
      (result) => {
        if (result.isConfirmed) {
          solicitud.cuotas = this.calcularCuotas(
            solicitud.monto,
            solicitud.interes,
            solicitud.cantidadCuotas,
            new Date()
          );

          solicitud.idPrestamista = this.login.idUsuario;
          solicitud.usuarioCreacion = this.login.email;
          solicitud.montoInteres = Number(
            solicitud.cuotas
              .map((cuota: any) => cuota.interes)
              .reduce((a: any, b: any) => a + b, 0)
              .toFixed(2)
          );

          solicitud.montoTotal = Number(
            (solicitud.montoInteres + solicitud.monto).toFixed(2)
          );

          solicitud.montoSolicitado = solicitud.monto;

          console.log('Aprobar Solicitud', solicitud);

          this.solicitudService
            .aprobarSolicitud(solicitud.idSolicitud, solicitud)
            .subscribe(
              (data) => {
                this.filtroEstado = '2';
                this.solicitudService
                  .getSolicitudesByPrestamista(this.login.idUsuario)
                  .subscribe(
                    (data) => {
                      this.listaSolicitudes = [...data.data].filter(
                        (solicitud) => solicitud.estado == this.filtroEstado
                      );
                    },
                    (error) => {
                      console.log(error);
                    }
                  );
                if (data.success === true) {
                  Swal.fire({
                    title: 'Solicitud de préstamo aprobada.',
                    text: 'Se generó el préstamo',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#197566',
                  });
                } else {
                  Swal.fire({
                    title: 'Error',
                    text: 'No se pudo generar el préstamo.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#197566',
                  });
                }
              },
              (error) => {
                console.log(error);
                Swal.fire({
                  title: 'Error',
                  text: 'No se pudo generar el préstamo.',
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                  confirmButtonColor: '#197566',
                });
              }
            );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  rechazarSolicitud(solicitud: any) {
    //está seguro de rechazar la solicitud?

    Swal.fire({
      title: '¿Está seguro de rechazar la solicitud?',
      html:
        'Ingrese el Motivo de rechazo para la Solicitud <strong> Nro. ' +
        solicitud.idSolicitud +
        '</strong>',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#197566',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#b21f2d',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showLoaderOnConfirm: true,
      preConfirm: (login) => {},
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        solicitud.idPrestamista = this.login.idUsuario;
        solicitud.usuarioModificacion = this.login.email;
        solicitud.observaciones = result.value;

        this.solicitudService
          .rechazarSolicitud(solicitud.idSolicitud, solicitud)
          .subscribe(
            (data) => {
              this.filtroEstado = '3';
              this.solicitudService
                .getSolicitudesByPrestamista(this.login.idUsuario)
                .subscribe(
                  (data) => {
                    this.listaSolicitudes = [...data.data].filter(
                      (solicitud) => solicitud.estado == this.filtroEstado
                    );
                  },
                  (error) => {
                    console.log(error);
                  }
                );
              if (data.success === true) {
                Swal.fire({
                  title: 'Solicitud de préstamo rechazada.',
                  text: 'Se rechazó la solicitud',
                  icon: 'success',
                  confirmButtonText: 'Aceptar',
                  confirmButtonColor: '#197566',
                });
              } else {
                Swal.fire({
                  title: 'Error',
                  text: 'No se pudo rechazar la solicitud.',
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                  confirmButtonColor: '#197566',
                });
              }
            },
            (error) => {
              console.log(error);
            }
          );
      }
    });
  }

  verPrestamo(solicitud: any) {
    this.router.navigate(['/consulta-prestamo']);
  }

  verMotivoRechazo(solicitud: any) {
    Swal.fire({
      title:
        'Motivo de rechazo de la solicitud <strong> Nro. ' +
        solicitud.idSolicitud +
        '</strong>',
      html: '<strong>"' + solicitud.observaciones + '"</strong>',
      icon: 'info',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#197566',
    });
  }

  calcularCuotas(
    montoTotal: number,
    porcentajeInteres: number,
    numeroCuotas: number,
    fechaInicio: Date
  ): CuotaPrestamo[] {
    console.log(montoTotal, porcentajeInteres, numeroCuotas, fechaInicio);
    this.montoTotalSolicitado = 0;
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
      this.montoTotalSolicitado += Number(cuotaMensual.toFixed(2));

      cuotas.push({
        numeroCuota: cuota,
        fechaVencimiento: format(
          fechaVencimiento.setDate(
            fechaVencimiento.getMonth() === 2
              ? fechaVencimiento.getDate() + 1
              : fechaVencimiento.getDate()
          ),
          'yyyy-MM-dd'
        ),
        monto: Number(cuotaMensual.toFixed(2)),
        interes: Number(interesMensual.toFixed(2)),
      });

      montoTotal -= capital;
    }

    console.log(cuotas);
    return cuotas;
  }

  ngOnInit(): void {}
}

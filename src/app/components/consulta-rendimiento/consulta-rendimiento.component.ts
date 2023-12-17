import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { NavigationExtras, Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  templateUrl: './consulta-rendimiento.component.html',
  styleUrls: ['./consulta-rendimiento.component.scss'],
})
export class ConsultaRendimientoComponent {
  login: any = {};
  filtroJefePrestamista: string = '0';
  listaJefePrestamista: any[] = [];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private empleadoService: EmpleadoService
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

    //Obtener Jefe Prestamistas
    this.empleadoService.getUsuarioPorPefil(2).subscribe(
      (data: any) => {
        if (data.success === true) {
          this.listaJefePrestamista = data.data;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {}

  filtrarRendimiento() {}

  chart: any;
  isButtonVisible = false;

  visitorsChartDrilldownHandler = (e: any) => {
    this.chart.options = this.visitorsDrilldownedChartOptions;
    this.chart.options.data = this.options[e.dataPoint.name];
    this.chart.options.title = { text: e.dataPoint.name };
    this.chart.render();
    this.isButtonVisible = true;
  };

  visitorsDrilldownedChartOptions = {
    animationEnabled: true,
    theme: 'light2',
    axisY: {
      gridThickness: 0,
      lineThickness: 1,
    },
    data: [],
  };

  newVSReturningVisitorsOptions = {
    animationEnabled: true,
    theme: 'light2',
    title: {
      text: 'Gráfico de Rendimiento',
      fontSize: 20,
    },
    subtitles: [
      {
        backgroundColor: '#2eacd1',
        fontSize: 14,
        fontColor: 'white',
        padding: 5,
      },
    ],
    data: [],
  };

  options: data = {
    'New vs Prestamos Pendientes de Pago': [
      {
        type: 'pie',
        name: 'New vs Prestamos Pendientes de Pago',
        startAngle: 90,
        cursor: 'pointer',
        explodeOnClick: false,
        showInLegend: true,
        legendMarkerType: 'square',
        click: this.visitorsChartDrilldownHandler,
        indexLabelPlacement: 'inside',
        indexLabelFontColor: 'white',
        dataPoints: [
          {
            y: 551160,
            name: 'Prestamos Pagado',
            color: '#058dc7',
            indexLabel: '62.56%',
          },
          {
            y: 329840,
            name: 'Prestamos Pendientes de Pago',
            color: '#50b432',
            indexLabel: '37.44%',
          },
        ],
      },
    ],
    'Prestamos Pagado': [
      {
        color: '#058dc7',
        name: 'Prestamos Pagado',
        type: 'column',
        dataPoints: [
          { label: 'Jan', y: 42600 },
          { label: 'Feb', y: 44960 },
          { label: 'Mar', y: 46160 },
          { label: 'Apr', y: 48240 },
          { label: 'May', y: 48200 },
          { label: 'Jun', y: 49600 },
          { label: 'Jul', y: 51560 },
          { label: 'Aug', y: 49280 },
          { label: 'Sep', y: 46800 },
          { label: 'Oct', y: 57720 },
          { label: 'Nov', y: 59840 },
          { label: 'Dec', y: 54400 },
        ],
      },
    ],
    'Prestamos Pendientes de Pago': [
      {
        color: '#50b432',
        name: 'Prestamos Pendientes de Pago',
        type: 'column',
        dataPoints: [
          { label: 'Jan', y: 21800 },
          { label: 'Feb', y: 25040 },
          { label: 'Mar', y: 23840 },
          { label: 'Apr', y: 24760 },
          { label: 'May', y: 25800 },
          { label: 'Jun', y: 26400 },
          { label: 'Jul', y: 27440 },
          { label: 'Aug', y: 29720 },
          { label: 'Sep', y: 29200 },
          { label: 'Oct', y: 31280 },
          { label: 'Nov', y: 33160 },
          { label: 'Dec', y: 31400 },
        ],
      },
    ],
  };

  handleClick(event: Event) {
    this.chart.options = this.newVSReturningVisitorsOptions;
    this.chart.options.data =
      this.options['New vs Prestamos Pendientes de Pago'];
    this.chart.render();
    this.isButtonVisible = false;
  }

  getChartInstance(chart: object) {
    this.chart = chart;
    this.chart.options = this.newVSReturningVisitorsOptions;
    this.chart.options.data =
      this.options['New vs Prestamos Pendientes de Pago'];
    this.chart.render();
  }
}

export interface data {
  [key: string]: any;
}

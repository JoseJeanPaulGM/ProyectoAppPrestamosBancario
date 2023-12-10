import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginService } from './services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { RegistroComponent } from './components/registro/registro.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { RegistroPrestamistaComponent } from './components/registro-prestamista/registro-prestamista.component';
import { ListadoGruposComponent } from './components/listado-grupos/listado-grupos.component';
import { ListadoPrestamistaComponent } from './components/listado-prestamista/listado-prestamista.component';
import { ListadoJefePrestamistaComponent } from './components/listado-jefe-prestamista/listado-jefe-prestamista.component';
import { RegistroJefePrestamistaComponent } from './components/registro-jefe-prestamista/registro-jefe-prestamista.component';
import { GruposComponent } from './components/grupos/grupos.component';
import { ConsultaPrestamoComponent } from './components/consulta-prestamo/consulta-prestamo.component';
import { ConsultaSolicitudComponent } from './components/consulta-solicitud/consulta-solicitud.component';
import { ConsultaCuotasComponent } from './components/consulta-cuotas/consulta-cuotas.component';
import { CuentasBancariasComponent } from './components/cuentas-bancarias/cuentas-bancarias.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    PrincipalComponent,
    LoadingComponent,
    RegistroComponent,
    SolicitudComponent,
    RegistroPrestamistaComponent,
    GruposComponent,
    ListadoGruposComponent,
    ListadoPrestamistaComponent,
    ListadoJefePrestamistaComponent,
    RegistroJefePrestamistaComponent,
    ConsultaPrestamoComponent,
    ConsultaSolicitudComponent,
    ConsultaCuotasComponent,
    CuentasBancariasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],

  providers: [LoginService],
  bootstrap: [AppComponent],
})
export class AppModule {}

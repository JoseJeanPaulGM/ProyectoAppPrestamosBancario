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
<<<<<<< HEAD
import { RegistroJefePrestamistaComponent } from './components/registro-jefe-prestamista/registro-jefe-prestamista.component';
=======
import { GruposComponent } from './components/grupos/grupos.component';
>>>>>>> 116599031c05fe258e0d8fa7e7c2f80bc0e6be6c

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
<<<<<<< HEAD
    RegistroJefePrestamistaComponent,
=======
    GruposComponent,
>>>>>>> 116599031c05fe258e0d8fa7e7c2f80bc0e6be6c
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],

  providers: [LoginService],
  bootstrap: [AppComponent],
})
export class AppModule {}

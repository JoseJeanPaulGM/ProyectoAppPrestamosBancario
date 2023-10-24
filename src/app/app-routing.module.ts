import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { LoginService } from './services/login.service';
import { LoginGuard } from './guards/Login.guard';
import { RegistroComponent } from './components/registro/registro.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { RegistroPrestamistaComponent } from './components/registro-prestamista/registro-prestamista.component';
import { RegistroJefePrestamistaComponent } from './components/registro-jefe-prestamista/registro-jefe-prestamista.component';
import { ListadoGruposComponent } from './components/listado-grupos/listado-grupos.component';
import { ListadoPrestamistaComponent } from './components/listado-prestamista/listado-prestamista.component';
import { ListadoJefePrestamistaComponent } from './components/listado-jefe-prestamista/listado-jefe-prestamista.component';

const routes: Routes = [
  { path: '', redirectTo: '/principal', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'resgitro-prestamista', component: RegistroPrestamistaComponent },
  {
    path: 'registro-jefe-prestamista',
    component: RegistroJefePrestamistaComponent,
  },
  { path: 'listado-grupos', component: ListadoGruposComponent },
  { path: 'listado-prestamista', component: ListadoPrestamistaComponent },
  {
    path: 'listado-jefe-prestamista',
    component: ListadoJefePrestamistaComponent,
  },

  // { path: 'solicitud', component: SolicitudComponent, canActivate: [LoginGuard] },
  { path: 'solicitud', component: SolicitudComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginService],
})
export class AppRoutingModule {}

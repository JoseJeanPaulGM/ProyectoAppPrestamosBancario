import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/principal', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService],
})
export class AppRoutingModule {}

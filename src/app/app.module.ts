import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoansListComponent } from './modules/loans-list/loans-list.component';
import { LoansCreatComponent } from './modules/loans-creat/loans-creat.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, NavbarComponent, LoansListComponent, LoansCreatComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],

  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}

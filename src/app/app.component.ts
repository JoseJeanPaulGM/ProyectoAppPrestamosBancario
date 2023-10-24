import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { el } from 'date-fns/locale';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  login: any;
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    let jsonText = localStorage.getItem('login');
    console.log(jsonText);

    if (jsonText == null) {
      this.loginService.setAuthenticated(false);
    } else {
      this.login = JSON.parse(jsonText ? jsonText : '');

      if (this.login && this.login.persona != null) {
        this.loginService.setAuthenticated(true);
        this.loginService.setMenus(this.login.modulos);
      } else {
        this.loginService.setAuthenticated(false);
      }
    }
  }
}

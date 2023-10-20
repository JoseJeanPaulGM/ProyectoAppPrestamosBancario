import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit, AfterViewInit {
  scrollPosition: number = 0;
  isMobileResolution: boolean = false;

  constructor(private spinnerService: SpinnerService, private router: Router) {
    this.spinnerService.deactivateSpinner();
  }
  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this.spinnerService.deactivateSpinner();
    // }, 500);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    this.scrollPosition = window.scrollY;
    this.isMobileResolution = true;
  }

  ngOnInit(): void {
    //this.spinnerService.activateSpinner();
  }

  irASolitudPrestamo() {
    this.router.navigate(['/solicitud']);
  }
}

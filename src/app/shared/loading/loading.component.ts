import { Component, OnInit, Output } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  spinnerActive: boolean = false;

  constructor(private spinnerService: SpinnerService) {}
  ngOnInit() {
    this.spinnerService.getSpinnerState().subscribe((isActive: boolean) => {
      this.spinnerActive = isActive;
    });
  }
}

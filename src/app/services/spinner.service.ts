import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private spinnerActive: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor() {}

  activateSpinner() {
    this.spinnerActive.next(true);
  }

  deactivateSpinner() {
    this.spinnerActive.next(false);
  }

  getSpinnerState(): Observable<boolean> {
    return this.spinnerActive.asObservable();
  }
}

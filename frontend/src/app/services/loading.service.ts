import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();
  constructor() { }

  // show the loading untill response
  show() {
    this._loading.next(true);
  }

  // hide the loading when response
  hide() {
    this._loading.next(false);
  }
}

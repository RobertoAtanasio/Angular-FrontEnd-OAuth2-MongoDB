import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private notify = new Subject();
  public notfyObservable$ = this.notify.asObservable();

  constructor(private toastr: ToastrService) { }

  showSuccess(titulo, message) {
    this.toastr.success(titulo, message);
    this.notify.next(true);
  }

  showWarning(titulo, message) {
    this.toastr.warning(titulo, message, { timeOut: 5000 });
    this.notify.next(true);
  }

  showError(titulo, message) {
    this.toastr.error(titulo, message);
    this.notify.next(true);
  }
}

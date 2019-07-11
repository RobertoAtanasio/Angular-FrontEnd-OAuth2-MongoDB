import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toastr: ToastrService) { }

  showSuccess(titulo, message) {
    this.toastr.success(titulo, message);
  }

  showWarning(titulo, message) {
    this.toastr.warning(titulo, message);
  }

  showError(titulo, message) {
    this.toastr.error(titulo, message);
  }
}

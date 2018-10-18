import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }

  add(): void {

  }

  log(message: string): void {
    this.snackBar.open(message, 'Dismiss', { duration: 6000 });
    console.log(message);
  }
}

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MyModalComponent } from '../pages/my-modal/my-modal.component'; 

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private dialog: MatDialog) {}

  openModal(): void {
    this.dialog.open(MyModalComponent, {
      width: '400px',
    });
  }
}

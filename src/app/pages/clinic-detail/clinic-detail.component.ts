import { Component } from '@angular/core';

@Component({
  selector: 'app-clinic-detail',
  templateUrl: './clinic-detail.component.html',
  styleUrls: ['./clinic-detail.component.scss']
})
export class ClinicDetailComponent {
  isTruncated: boolean = true;

  
  toggleDescription() {
    this.isTruncated = !this.isTruncated;
  }
}

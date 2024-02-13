import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingDataService {
  private storageKey = 'bookingDataService';

  get bookingData(): any {
    const storedValue = localStorage.getItem(this.storageKey);
    return storedValue !== null ? JSON.parse(storedValue) : {}; // Provide a default value
  }

  set bookingData(value: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(value));
  }

  clearBookingData() {
    localStorage.removeItem(this.storageKey);
  }

  constructor() { }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeSlotService {
  private storageKey = 'timeSlotService';

  get timeSlotService(): any {
    const storedValue = localStorage.getItem(this.storageKey);
    return storedValue !== null ? JSON.parse(storedValue) : {}; // Provide a default value
  }

  set timeSlotService(value: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(value));
  }

  clearTimeSlotService() {
    localStorage.removeItem(this.storageKey);
  }

  constructor() { }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorsDataService {
  private storageKey = 'doctorsDataService';

  get doctorsData(): any {
    const storedValue = localStorage.getItem(this.storageKey);
    return storedValue !== null ? JSON.parse(storedValue) : {}; // Provide a default value
  }

  set doctorsData(value: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(value));
  }

  clearDoctorsData() {
    localStorage.removeItem(this.storageKey);
  }

  constructor() { }
}

// // src/app/services/cashfree.service.ts
// import { Injectable } from '@angular/core';
// import { load } from '@cashfreepayments/cashfree-js';

// @Injectable({
//   providedIn: 'root',
// })
// export class CashfreeService {
//   private cashfree: any;

//   constructor() {
//     // Initialize Cashfree using the load function
//     load().then((cashfree) => {
//       this.cashfree = cashfree({ mode: 'sandbox' }); // or 'production'
//     });
//   }

//   createOrder(orderDetails: any): Promise<any> {
//     if (!this.cashfree) {
//       return Promise.reject(new Error('Cashfree SDK is not initialized yet.'));
//     }
//     return this.cashfree.pg.createOrder(orderDetails);
//   }
// }

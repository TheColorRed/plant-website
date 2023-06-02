import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GoogleService {
  directions(destination: string, origin?: string) {
    const originStr = `&origin=${origin}`;
    const destinationStr = `&destination=${destination}`;
    return `https://www.google.com/maps/dir/?api=1${originStr}${destinationStr}&travelmode=driving`;
  }
  location(address: string) {
    return `https://www.google.com/maps/search/?api=1&query=${address}`;
  }
}

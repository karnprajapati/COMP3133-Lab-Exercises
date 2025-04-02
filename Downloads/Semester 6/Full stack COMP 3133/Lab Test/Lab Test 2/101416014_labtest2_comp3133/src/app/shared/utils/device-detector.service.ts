import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetectorService {
  private mobileBreakpoint = 768;
  
  constructor() {}
  
  /**
   * Check if the current device is a mobile device
   * based on screen width
   */
  isMobile(): boolean {
    return window.innerWidth < this.mobileBreakpoint;
  }
  
  /**
   * Check if the current device is a tablet device
   * based on screen width
   */
  isTablet(): boolean {
    return window.innerWidth >= this.mobileBreakpoint && window.innerWidth < 1024;
  }
  
  /**
   * Check if the current device is a desktop device
   * based on screen width
   */
  isDesktop(): boolean {
    return window.innerWidth >= 1024;
  }
}
import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetectorService {
  private mobileBreakpoint = 768;
  private tabletBreakpoint = 992;
  
  constructor() { }
  
  /**
   * Checks if the current device is a mobile device based on screen width
   */
  isMobile(): boolean {
    return window.innerWidth < this.mobileBreakpoint;
  }
  
  /**
   * Checks if the current device is a tablet device based on screen width
   */
  isTablet(): boolean {
    return window.innerWidth >= this.mobileBreakpoint && window.innerWidth < this.tabletBreakpoint;
  }
  
  /**
   * Checks if the current device is a desktop device based on screen width
   */
  isDesktop(): boolean {
    return window.innerWidth >= this.tabletBreakpoint;
  }
  
  /**
   * Creates an observable that emits when window is resized
   */
  onResize(): Observable<Event> {
    return fromEvent(window, 'resize');
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Mission } from '../models/mission.model';

@Injectable({
  providedIn: 'root'
})
export class SpacexService {
  private BASE_URL = 'https://api.spacexdata.com/v3';
  
  constructor(private http: HttpClient) { }
  
  /**
   * Fetches all SpaceX launches
   */
  getAllLaunches(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.BASE_URL}/launches`);
  }
  
  /**
   * Fetches SpaceX launches by year
   */
  getLaunchesByYear(year: string): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.BASE_URL}/launches`, {
      params: { launch_year: year }
    });
  }
  
  /**
   * Fetches a specific SpaceX launch by flight number
   */
  getLaunchByFlightNumber(flightNumber: number): Observable<Mission> {
    return this.http.get<Mission>(`${this.BASE_URL}/launches/${flightNumber}`);
  }
  
  /**
   * Fetches all available launch years
   */
  getLaunchYears(): Observable<string[]> {
    return this.getAllLaunches().pipe(
      map(launches => {
        // Extract unique years and sort in descending order
        const years = [...new Set(launches.map(launch => launch.launch_year))];
        return years.sort((a, b) => parseInt(b) - parseInt(a));
      })
    );
  }
}
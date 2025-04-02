import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpacexService } from '../../services/spacex.service';
import { Mission } from '../../models/mission.model';
import { DeviceDetectorService } from '../../services/device-detector.service';

@Component({
  selector: 'app-missiondetails',
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.scss']
})
export class MissiondetailsComponent implements OnInit {
  mission: Mission | null = null;
  isLoading = true;
  error: string | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spacexService: SpacexService,
    public deviceDetector: DeviceDetectorService
  ) {}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const flightNumberParam = params.get('flightNumber');
      
      if (flightNumberParam) {
        const flightNumber = parseInt(flightNumberParam, 10);
        this.loadMissionDetails(flightNumber);
      } else {
        this.error = 'No flight number provided';
        this.isLoading = false;
      }
    });
  }
  
  loadMissionDetails(flightNumber: number): void {
    this.isLoading = true;
    this.error = null;
    
    this.spacexService.getLaunchByFlightNumber(flightNumber).subscribe({
      next: (data) => {
        this.mission = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching mission details:', err);
        this.error = 'Failed to load mission details. Please try again.';
        this.isLoading = false;
      }
    });
  }
  
  goBack(): void {
    this.router.navigate(['/missions']);
  }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString();
  }
}
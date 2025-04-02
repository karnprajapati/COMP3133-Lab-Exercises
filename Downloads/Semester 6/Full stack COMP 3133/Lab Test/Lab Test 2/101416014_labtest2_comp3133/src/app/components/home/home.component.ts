import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpacexService } from '../../services/spacex.service';
import { Mission } from '../../models/mission.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recentMissions: Mission[] = [];
  isLoading = true;
  error: string | null = null;
  
  constructor(
    private spacexService: SpacexService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.loadRecentMissions();
  }
  
  loadRecentMissions(): void {
    this.isLoading = true;
    
    this.spacexService.getAllLaunches().subscribe({
      next: (data) => {
        // Sort by launch date (latest first) and take the 3 most recent
        this.recentMissions = data
          .sort((a, b) => new Date(b.launch_date_utc).getTime() - new Date(a.launch_date_utc).getTime())
          .slice(0, 3);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching recent missions:', err);
        this.error = 'Failed to load recent missions';
        this.isLoading = false;
      }
    });
  }
  
  viewAllMissions(): void {
    this.router.navigate(['/missions']);
  }
  
  viewMissionDetails(mission: Mission): void {
    this.router.navigate(['/mission', mission.flight_number]);
  }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
}
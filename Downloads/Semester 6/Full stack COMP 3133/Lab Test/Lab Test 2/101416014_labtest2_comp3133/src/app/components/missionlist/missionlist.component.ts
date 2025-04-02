import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { SpacexService } from '../../services/spacex.service';
import { Mission, MissionFilter } from '../../models/mission.model';
import { DeviceDetectorService } from '../../services/device-detector.service';

@Component({
  selector: 'app-missionlist',
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.scss']
})
export class MissionlistComponent implements OnInit {
  missions: Mission[] = [];
  filteredMissions: Mission[] = [];
  years: string[] = [];
  isLoading = true;
  error: string | null = null;
  filter: MissionFilter = {};
  
  // Pagination
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  pageIndex = 0;
  
  constructor(
    private spacexService: SpacexService,
    private router: Router,
    public deviceDetector: DeviceDetectorService
  ) {}
  
  ngOnInit(): void {
    this.loadMissions();
    this.loadYears();
  }
  
  loadMissions(): void {
    this.isLoading = true;
    
    this.spacexService.getAllLaunches().subscribe({
      next: (data) => {
        this.missions = data;
        this.applyFilter();
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load missions. Please try again later.';
        console.error('Error fetching missions:', err);
        this.isLoading = false;
      }
    });
  }
  
  loadYears(): void {
    this.spacexService.getLaunchYears().subscribe({
      next: (data) => {
        this.years = data;
      },
      error: (err) => {
        console.error('Error fetching years:', err);
      }
    });
  }
  
  onFilterChange(filter: MissionFilter): void {
    this.filter = filter;
    this.pageIndex = 0; // Reset to first page when filter changes
    this.applyFilter();
  }
  
  applyFilter(): void {
    let filtered = [...this.missions];
    
    // Filter by year if selected
    if (this.filter.year) {
      filtered = filtered.filter(mission => mission.launch_year === this.filter.year);
    }
    
    // Filter by search term if provided
    if (this.filter.searchTerm) {
      const searchTerm = this.filter.searchTerm.toLowerCase();
      filtered = filtered.filter(mission => 
        mission.mission_name.toLowerCase().includes(searchTerm) ||
        (mission.details && mission.details.toLowerCase().includes(searchTerm))
      );
    }
    
    this.filteredMissions = filtered;
  }
  
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
  
  getPaginatedMissions(): Mission[] {
    const startIndex = this.pageIndex * this.pageSize;
    return this.filteredMissions.slice(startIndex, startIndex + this.pageSize);
  }
  
  viewMissionDetails(mission: Mission): void {
    this.router.navigate(['/mission', mission.flight_number]);
  }
  
  get totalMissions(): number {
    return this.filteredMissions.length;
  }
}
import { Component, OnInit } from '@angular/core';
import { SpacexService } from '../../services/spacex.service';
import { Mission, MissionFilter } from '../../models/mission.model';
import { DeviceDetectorService } from '../../services/device-detector.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  missions: Mission[] = [];
  filteredMissions: Mission[] = [];
  launchYears: string[] = [];
  selectedMission: Mission | null = null;
  isLoading = true;
  currentPage = 1;
  missionsPerPage = 10;
  totalPages = 1;
  
  filter: MissionFilter = {
    year: '',
    searchTerm: ''
  };
  
  isMobile = false;
  
  constructor(
    private spacexService: SpacexService,
    private deviceDetector: DeviceDetectorService
  ) { }
  
  ngOnInit(): void {
    this.isMobile = this.deviceDetector.isMobile();
    this.loadLaunchYears();
    this.loadMissions();
    
    // Listen for window resize events
    this.deviceDetector.onResize().subscribe(() => {
      this.isMobile = this.deviceDetector.isMobile();
    });
  }
  
  loadLaunchYears(): void {
    this.spacexService.getLaunchYears().subscribe(
      years => {
        this.launchYears = years;
      },
      error => {
        console.error('Error loading launch years:', error);
      }
    );
  }
  
  loadMissions(): void {
    this.isLoading = true;
    
    if (this.filter.year) {
      this.spacexService.getLaunchesByYear(this.filter.year).subscribe(
        missions => {
          this.missions = missions;
          this.applySearch();
          this.calculatePagination();
          this.isLoading = false;
        },
        error => {
          console.error('Error loading missions by year:', error);
          this.isLoading = false;
        }
      );
    } else {
      this.spacexService.getAllLaunches().subscribe(
        missions => {
          this.missions = missions;
          this.applySearch();
          this.calculatePagination();
          this.isLoading = false;
        },
        error => {
          console.error('Error loading all missions:', error);
          this.isLoading = false;
        }
      );
    }
  }
  
  applySearch(): void {
    if (this.filter.searchTerm && this.filter.searchTerm.trim() !== '') {
      const search = this.filter.searchTerm.toLowerCase().trim();
      this.filteredMissions = this.missions.filter(mission => 
        mission.mission_name.toLowerCase().includes(search) ||
        mission.rocket.rocket_name.toLowerCase().includes(search) ||
        (mission.details && mission.details.toLowerCase().includes(search))
      );
    } else {
      this.filteredMissions = [...this.missions];
    }
    
    this.calculatePagination();
    this.currentPage = 1;
  }
  
  onFilterChange(filter: MissionFilter): void {
    this.filter = filter;
    this.loadMissions();
  }
  
  onSelectMission(mission: Mission): void {
    this.selectedMission = this.selectedMission && this.selectedMission.flight_number === mission.flight_number 
      ? null 
      : mission;
  }
  
  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredMissions.length / this.missionsPerPage);
  }
  
  onPageChange(page: number): void {
    this.currentPage = page;
  }
  
  getCurrentPageMissions(): Mission[] {
    const startIndex = (this.currentPage - 1) * this.missionsPerPage;
    const endIndex = startIndex + this.missionsPerPage;
    return this.filteredMissions.slice(startIndex, endIndex);
  }
}
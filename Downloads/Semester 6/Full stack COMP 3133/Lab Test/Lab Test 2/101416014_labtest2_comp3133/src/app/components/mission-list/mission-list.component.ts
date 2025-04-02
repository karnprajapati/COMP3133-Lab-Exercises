import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Mission } from '../../models/mission.model';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.scss']
})
export class MissionListComponent {
  @Input() missions: Mission[] = [];
  @Input() isLoading = true;
  @Input() selectedMission: Mission | null = null;
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Input() totalMissions = 0;
  
  @Output() selectMission = new EventEmitter<Mission>();
  @Output() pageChange = new EventEmitter<number>();
  
  trackByFlightNumber(index: number, item: Mission): number {
    return item.flight_number;
  }
  
  isMissionSelected(mission: Mission): boolean {
    return !!this.selectedMission && this.selectedMission.flight_number === mission.flight_number;
  }
  
  onSelectMission(mission: Mission): void {
    this.selectMission.emit(mission);
  }
  
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
  
  get pages(): number[] {
    const visiblePages = 5;
    const pages: number[] = [];
    
    let startPage = Math.max(1, this.currentPage - Math.floor(visiblePages / 2));
    let endPage = startPage + visiblePages - 1;
    
    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = Math.max(1, endPage - visiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }
}
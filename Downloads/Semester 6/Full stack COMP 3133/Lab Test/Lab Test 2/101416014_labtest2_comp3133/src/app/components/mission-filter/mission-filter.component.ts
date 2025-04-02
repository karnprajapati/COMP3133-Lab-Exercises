import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MissionFilter } from '../../models/mission.model';

@Component({
  selector: 'app-mission-filter',
  templateUrl: './mission-filter.component.html',
  styleUrls: ['./mission-filter.component.scss']
})
export class MissionFilterComponent implements OnInit {
  @Input() years: string[] = [];
  @Input() filter: MissionFilter = { year: '', searchTerm: '' };
  @Input() totalMissions = 0;
  @Input() filteredCount = 0;
  @Input() isLoading = false;
  
  @Output() filterChange = new EventEmitter<MissionFilter>();
  
  selectedYear = '';
  searchTerm = '';
  hasActiveFilters = false;
  
  ngOnInit(): void {
    this.selectedYear = this.filter.year || '';
    this.searchTerm = this.filter.searchTerm || '';
    this.updateHasActiveFilters();
  }
  
  onYearChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedYear = select.value;
    this.emitFilterChange();
  }
  
  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.emitFilterChange();
  }
  
  clearFilters(): void {
    this.selectedYear = '';
    this.searchTerm = '';
    this.emitFilterChange();
  }
  
  private emitFilterChange(): void {
    const newFilter: MissionFilter = {
      year: this.selectedYear,
      searchTerm: this.searchTerm
    };
    
    this.updateHasActiveFilters();
    this.filterChange.emit(newFilter);
  }
  
  private updateHasActiveFilters(): void {
    this.hasActiveFilters = !!(this.selectedYear || this.searchTerm);
  }
}
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MissionFilter } from '../../models/mission.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-missionfilter',
  templateUrl: './missionfilter.component.html',
  styleUrls: ['./missionfilter.component.scss']
})
export class MissionfilterComponent implements OnInit {
  @Input() years: string[] = [];
  @Input() filter: MissionFilter = {};
  @Input() totalMissions: number = 0;
  @Input() filteredCount: number = 0;
  @Output() filterChange = new EventEmitter<MissionFilter>();
  
  filterForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      year: [''],
      searchTerm: ['']
    });
  }
  
  ngOnInit(): void {
    // Initialize form with any existing filter values
    this.filterForm.patchValue({
      year: this.filter.year || '',
      searchTerm: this.filter.searchTerm || ''
    });
    
    // Listen for form changes
    this.filterForm.valueChanges
      .pipe(debounceTime(300)) // Add debounce to prevent excessive filtering
      .subscribe(values => {
        const newFilter: MissionFilter = {};
        
        if (values.year) {
          newFilter.year = values.year;
        }
        
        if (values.searchTerm) {
          newFilter.searchTerm = values.searchTerm;
        }
        
        this.filterChange.emit(newFilter);
      });
  }
  
  clearFilters(): void {
    this.filterForm.reset({
      year: '',
      searchTerm: ''
    });
    this.filterChange.emit({});
  }
  
  get hasActiveFilters(): boolean {
    return !!(this.filter.year || this.filter.searchTerm);
  }
}
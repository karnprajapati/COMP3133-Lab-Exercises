import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Mission } from '../../models/mission.model';

@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.component.html',
  styleUrls: ['./mission-details.component.scss']
})
export class MissionDetailsComponent {
  @Input() mission: Mission | null = null;
  @Input() isMobile = false;
  
  @Output() close = new EventEmitter<void>();
  
  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short'
    });
  }
  
  onCloseDetails(): void {
    this.close.emit();
  }
}
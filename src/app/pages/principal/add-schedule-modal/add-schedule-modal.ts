import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-schedule-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-schedule-modal.html',
  styleUrls: ['./add-schedule-modal.css']
})
export class AddScheduleModalComponent {
  
  @Output() close = new EventEmitter<void>();

  closeModal(): void {
    this.close.emit();
  }
}
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.css']
})
export class SaveButtonComponent {
  @Input() valid?: boolean;
  @Output() saveButtonClick: EventEmitter<void> = new EventEmitter<void>();
}

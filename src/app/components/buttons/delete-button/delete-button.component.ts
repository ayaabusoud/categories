import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css']
})
export class DeleteButtonComponent {
  deleteIcon = faTrashCan;
  @Output() deleteButtonClick = new EventEmitter<void>();
}

import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-room-create',
  imports: [FormsModule],
  templateUrl: './room-create.html',
  styleUrl: './room-create.scss'
})
export class RoomCreate {
    @Output() roomCreated = new EventEmitter<string>();
    
    roomName: string = '';

    constructor() {
    }

    onSubmit(): void {
        const name = this.roomName.trim();
        if (!name) return;
        this.roomCreated.emit(name);
        this.roomName = '';
    }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css']
})
export class NoteItemComponent {
  @Input('name') name: string = '';
  @Input('content') content: string = '';

  constructor() {
    
  }
}

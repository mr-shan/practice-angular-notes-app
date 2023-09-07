import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css']
})
export class NoteItemComponent {
  @Input('name') name: string = '';
  @Input('content') content: string = '';
  @Input('id') id: string = '';
  @Output('openNote') openNote = {} as EventEmitter<string>;

  constructor() {
    this.openNote = new EventEmitter();
  }

  onNoteClick() {
    this.openNote.emit(this.id);
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Note } from '../note.model';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css']
})
export class NoteItemComponent {
  @Input('data') data: Note = {} as Note;

  @Output('openNote') openNote = {} as EventEmitter<string>;

  constructor() {
    this.openNote = new EventEmitter();
  }

  onNoteClick() {
    this.openNote.emit(this.data.id);
  }
}

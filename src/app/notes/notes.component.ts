import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Note } from './note.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  @Input('notes') notes: Array<Note>;
  @Output('openNote') openNote: EventEmitter<string>;

  constructor() {
    this.notes = [];
    this.openNote = new EventEmitter()
  }

  onOpenNote(event: string) {
    this.openNote.emit(event);
  }
}

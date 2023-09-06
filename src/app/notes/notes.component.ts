import { Component, Input } from '@angular/core';

import { Note } from './note.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  @Input('notes') notes: Array<Note>;

  constructor() {
    this.notes = [];
  }
}

import { Component } from '@angular/core';
import { Note } from './notes/note.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notes';
  showNewNoteDialog: boolean;
  notes: Array<Note>;

  constructor() {
    this.showNewNoteDialog = false;
    this.notes = [
      new Note('First note and this is the biggest title', 'this is my first note'),
      new Note('First note', 'this is my first note'),
      new Note('First note', 'this is my first note'),
      new Note('First note', 'this is my first note'),
      new Note('First note', 'this is my first note and it is looking very good. Now I can say that it;s looking good'),
      new Note('First note', 'this is my first note'),
      new Note('First note', 'this is my first note'),
      new Note('Second note', 'This is my second note')
    ]
  }

  onSaveNote(event: Note) {
    this.notes.push(event);
    this.closeNewNoteDialog();
  }

  openNewNoteDialog() {
    this.showNewNoteDialog = true;
  }

  closeNewNoteDialog() {
    this.showNewNoteDialog = false;
  }
}

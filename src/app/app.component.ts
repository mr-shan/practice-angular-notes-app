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
  noteData: Note | null;

  constructor() {
    this.showNewNoteDialog = false;
    this.noteData = null;
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

  onSaveNote(event: any) {
    if (event.mode === 'new') {
      const newNote = new Note(event.name, event.content);
      this.notes.push(newNote);
    } else if (event.mode === 'edit' && event.id) {
      const existingNote = this.notes.find(e => e.id === event.id)
      if (existingNote) {
        existingNote.content = event.content;
        existingNote.name = event.name;
      }
    }
    this.closeNewNoteDialog();
  }

  onOpenExistingNote(event: string) {
    const data = this.notes.find(e => e.id === event);
    if (!data) return;

    this.noteData = data;
    this.showNewNoteDialog = true;
  }

  openNewNoteDialog() {
    this.showNewNoteDialog = true;
  }

  closeNewNoteDialog() {
    this.showNewNoteDialog = false;
  }
}
